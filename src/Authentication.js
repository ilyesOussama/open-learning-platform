import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  client,
  challenge,
  authenticate,
  defaultProfile,
  getCurrentProfile,
  getDefaultProfile,
  signCreatePostTypedData,
  lensHub,
  splitSignature,
  validateMetadata,
} from "./pages/api/api";

import { useProfiles } from "@memester-xyz/lens-use";
import { useTokenStore } from "./store/token";
import { useAuthStore } from "./store/auth";

const Auth = () => {
  const token = useAuthStore((state) => state.token);
  const address = useAuthStore((state) => state.address);
  const session = useAuthStore((state) => state.session);
  const profileId = useAuthStore((state) => state.profileId);
  const handle = useAuthStore((state) => state.handle);

  const setToken = useAuthStore((state) => state.setToken);
  const setAddress = useAuthStore((state) => state.setAddress);
  const setSession = useAuthStore((state) => state.setSession);
  const setProfileId = useAuthStore((state) => state.setProfileId);
  const setHandle = useAuthStore((state) => state.setHandle);

  /* local state variables to hold uer's address and access token */

  const { data } = useProfiles(address);

  useEffect(() => {
    setHandle(data?.profiles?.items[0]?.handle);
  }, []);
  /* 
  useEffect(() => {
    getDefaultProfile();
  }, []); */
  /* 
  async function getDefaultProfile() {
    const profile = await client.query({
      query: defaultProfile,
      variables: { ethereumAddress: address },
    });
    setDProfile(profile?.data?.defaultProfile?.handle);
  } */
  useEffect(() => {
    /* when the app loads, check to see if the user has already connected their wallet */
    checkConnection();
  }, []);

  async function checkConnection() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    if (accounts.length) {
      setAddress(accounts[0]);
      const response = await client.query({
        query: getDefaultProfile,
        variables: { address: accounts[0] },
      });
      setProfileId(response.data.defaultProfile.id);
      setHandle(response.data.defaultProfile.handle);
    }
  }

  async function connect() {
    const account = await window.ethereum.send("eth_requestAccounts");
    if (account.result.length) {
      setAddress(account.result[0]);
      const response = await client.query({
        query: getDefaultProfile,
        variables: { address: accounts[0] },
      });
      setProfileId(response.data.defaultProfile.id);
      setHandle(response.data.defaultProfile.handle);
    }
  }

  async function login() {
    try {
      const challengeInfo = await client.query({
        query: challenge,
        variables: {
          address,
        },
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text
      );
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address,
          signature,
        },
      });

      const {
        data: {
          authenticate: { accessToken },
        },
      } = authData;
      localStorage.setItem("lens-auth-token", accessToken);
      setToken(accessToken);
      setSession(authData.data.authenticate);
    } catch (err) {
      console.log("Error signing in: ", err);
    }
  }

  return (
    <div>
      {/* if the user has not yet connected their wallet, show a connect button */}
      {!address && <button onClick={connect}>Connect</button>}
      {/* if the user has connected their wallet but has not yet authenticated, show them a login button */}
      {address && !token && (
        <div onClick={login}>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Login
          </button>
        </div>
      )}
      {/* once the user has authenticated, show them a success message */}
      {address && token && <h2>{handle ? handle : "handle.lens"}</h2>}
    </div>
  );
};

export default Auth;
