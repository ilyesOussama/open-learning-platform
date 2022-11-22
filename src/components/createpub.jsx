import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  client,
  challenge,
  authenticate,
  getDefaultProfile,
  signCreatePostTypedData,
  lensHub,
  splitSignature,
  validateMetadata,
} from "../pages/api/api";
import { create } from "ipfs-http-client";
import { v4 as uuid } from "uuid";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

import { useAuthStore } from "../store/auth";

const CreatePublication = () => {
  const address = useAuthStore((state) => state.address);
  const session = useAuthStore((state) => state.session);
  const profileId = useAuthStore((state) => state.profileId);
  const handle = useAuthStore((state) => state.handle);
  const token = useAuthStore((state) => state.token);
  console.log(address);

  const [postData, setPostData] = useState("");

  async function createPost() {
    if (!postData) return;
    const ipfsData = await uploadToIPFS();
    const createPostRequest = {
      profileId,
      contentURI: "ipfs://" + ipfsData.path,
      collectModule: {
        freeCollectModule: { followerOnly: true },
      },
      referenceModule: {
        followerOnlyReferenceModule: false,
      },
    };
    try {
      const signedResult = await signCreatePostTypedData(
        createPostRequest,
        token
      );
      const typedData = signedResult.result.typedData;
      const { v, r, s } = splitSignature(signedResult.signature);
      const tx = await lensHub.postWithSig({
        profileId: typedData.value.profileId,
        contentURI: typedData.value.contentURI,
        collectModule: typedData.value.collectModule,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      });
      console.log("successfully created post: tx hash", tx.hash);
    } catch (err) {
      console.log("error posting publication: ", err);
    }
  }

  async function uploadToIPFS() {
    const metaData = {
      version: "2.0.0",
      content: postData,
      description: postData,
      name: `Post by @${handle}`,
      external_url: `https://lenster.xyz/u/${handle}`,
      metadata_id: uuid(),
      mainContentFocus: "TEXT_ONLY",
      attributes: [],
      locale: "en-US",
    };

    const result = await client.query({
      query: validateMetadata,
      variables: {
        metadatav2: metaData,
      },
    });
    console.log("Metadata verification request: ", result);

    const added = await ipfsClient.add(JSON.stringify(metaData));
    return added;
  }
  function onChange(e) {
    setPostData(e.target.value);
  }
  return (
    <div className="max-w-7xl mx-auto mt-4 p-4 2xl:p-0">
      {address && session && (
        <div className="flex flex-col gap-2">
          <textarea
            onChange={onChange}
            placeholder="Create a publication on lens"
            className="border border-gray-300 dark:bg-gray-700 dark:text-gray-50  dark:border-gray-600 rounded-lg shadow-sm overflow-hidden focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500"
          />
          <button
            onClick={createPost}
            className="max-w-[114px] inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Create Post
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatePublication;
