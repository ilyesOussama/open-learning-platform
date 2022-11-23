import BigNumber from "bignumber.js";
import { useContext, useState } from "react";
import { MainContext } from "../context";

const BundlrComp = () => {
  const [formData, setFormData] = useState({});

  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [URI, setURI] = useState();
  const [amount, setAmount] = useState();
  const { bundlrInstance, initialiseBundlr, balance, fetchBalance } =
    useContext(MainContext);
  async function initialize() {
    initialiseBundlr();
  }
  function onFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const image = URL.createObjectURL(file);
      setImage(image);
      let reader = new FileReader();
      reader.onload = function () {
        if (reader.result) {
          setFile(Buffer.from(reader.result));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  async function uploadFile() {
    let tx = await bundlrInstance.uploader.upload(file, [
      { name: "Content-Type", value: "video/mp4" },
    ]);
    console.log("tx: ", tx);
    setURI(`http://arweave.net/${tx.data.id}`);
    setFormData({ ...formData, videoUrl: e.target.value });
  }

  async function fundWallet() {
    if (!amount) return;
    const amountParsed = parseInput(amount);
    let response = await bundlrInstance.fund(amountParsed);
    console.log("Wallet funded: ", response);
    fetchBalance();
  }

  function parseInput(input) {
    const conv = new BigNumber(input).multipliedBy(
      bundlrInstance.currencyConfig.base[1]
    );
    if (conv.isLessThan(1)) {
      console.log("error: value too small");
      return;
    } else {
      return conv;
    }
  }

  async function saveCourse(e) {
    e.preventDefault();
    const response = await fetch("/api/courses", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    return await response.json();
  }

  return (
    <div className="max-w-7xl mx-auto p-4 xl:p-0 mt-4">
      {!balance && (
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={initialize}
        >
          Initialize bundlr
        </button>
      )}
      {balance && (
        <div>
          <h3>Balance: {balance}</h3>
          <div style={{ padding: "20px 0px" }}>
            <input
              className="p-3 mb-2 max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={fundWallet}
            >
              Fund Wallet
            </button>
          </div>
          <input type="file" onChange={onFileChange} />
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={uploadFile}
          >
            Upload File
          </button>
          {image && <img src={image} style={{ width: "200px" }} />}
          {URI && <a href={URI}>{URI}</a>}
        </div>
      )}
      <div className="w-full col-start-3 col-end-13">
        <form action="" onSubmit={saveCourse}>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start py-4 sm:pt-5 p-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-100"
            >
              Title
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: e.target.value,
                  })
                }
                type="text"
                name="title"
                id="title"
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start py-4 sm:pt-5 p-4 sm:border-t sm:border-gray-200 dark:border-gray-700">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-100 "
            >
              Category
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="category"
                id="category"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:border-gray-700 sm:pt-5 p-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-100 "
            >
              Description
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2 py-4">
              <textarea
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                id="description"
                name="description"
                rows={3}
                className=" dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700 max-w-lg shadow-sm block w-full focus:ring-green-500 focus:border-green-500 sm:text-sm border border-gray-300 rounded-md"
                defaultValue={""}
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:border-gray-700 sm:pt-5 p-4">
            <label
              htmlFor="whatTeach"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-100 "
            >
              What you will teach?
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2 py-4">
              <textarea
                onChange={(e) =>
                  setFormData({ ...formData, whatTeach: e.target.value })
                }
                id="whatTeach"
                name="whatTeach"
                rows={3}
                className=" dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700 max-w-lg shadow-sm block w-full focus:ring-green-500 focus:border-green-500 sm:text-sm border border-gray-300 rounded-md"
                defaultValue={""}
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:border-gray-700 sm:pt-5 p-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-100 "
            >
              What this course will contain?
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2 py-4">
              <textarea
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                id="content"
                name="content"
                rows={3}
                className=" dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700 max-w-lg shadow-sm block w-full focus:ring-green-500 focus:border-green-500 sm:text-sm border border-gray-300 rounded-md"
                defaultValue={""}
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start py-4 sm:pt-5 p-4 sm:border-t sm:border-gray-200 dark:border-gray-700">
            <label
              htmlFor="videoUrl"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-100"
            >
              VideoUrl
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    videoUrl: e.target.value,
                    length: "4h",
                    teacher: { connect: { id: 1 } },
                  })
                }
                type="text"
                name="videoUrl"
                id="videoUrl"
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>

          {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t dark:border-gray-700 sm:border-gray-200 sm:pt-5 p-4">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-100"
            >
              Cover photo
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed dark:border-gray-600 rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="cover-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                    >
                      <span className="">Upload a file</span>
                      <input
                        id="cover-upload"
                        name="cover-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 dark:text-gray-100">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-100">
                    PNG, JPG, GIF
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          {/*  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t dark:border-gray-700 sm:border-gray-200 sm:pt-5 p-4">
            <label
              htmlFor="course-files"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-100"
            >
              Course Material
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed dark:border-gray-600 rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                    >
                      <span className="">Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 dark:text-gray-100">or drag and drop</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default BundlrComp;
