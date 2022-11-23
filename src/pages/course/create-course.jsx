import { WebBundlr } from "@bundlr-network/client";
import { MainContext } from "../../context";
import { useState, useRef } from "react";
import { providers, utils } from "ethers";

import BundlrComp from "../../components/BundlrComp";

const CreateCourse = () => {
  const [bundlrInstance, setBundlrInstance] = useState();
  const [balance, setBalance] = useState();
  const bundlrRef = useRef();
  async function initialiseBundlr() {
    await window.ethereum.enable();

    const provider = new providers.Web3Provider(window.ethereum);
    await provider._ready();

    const bundlr = new WebBundlr(
      "https://node1.bundlr.network",
      "matic",
      provider
    );
    await bundlr.ready();

    setBundlrInstance(bundlr);
    bundlrRef.current = bundlr;
    fetchBalance();
  }

  async function fetchBalance() {
    const bal = await bundlrRef.current.getLoadedBalance();
    console.log("bal: ", utils.formatEther(bal.toString()));
    setBalance(utils.formatEther(bal.toString()));
  }

  return (
    <div>
      <MainContext.Provider
        value={{
          initialiseBundlr,
          bundlrInstance,
          balance,
          fetchBalance,
        }}
      >
        <BundlrComp />
      </MainContext.Provider>
    </div>
  );
};

export default CreateCourse;
