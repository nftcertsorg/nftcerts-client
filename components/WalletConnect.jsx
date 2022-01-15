import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import {useEnsAddress, useEnsName} from "../hooks/ens";

import { useEnsLookup } from 'wagmi'

const providerOptions = {
  /* See Provider Options Section */
};

let web3Modal = null;

export default function WalletConnect() {
  const [address, setAddress] = useState('');
  // console.log("ENS address " , useEnsName("moritzfelipe.eth"))
   const name = useEnsAddress("0xd8da6bf26964af9d7eed9e03e53415d37aa96045")

  console.log("ENS name from address ", name)

  const initWeb3 = () => {
    if (typeof window !== "undefined") {
      web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
      });
    }

  };

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(
      await web3Modal.connect()
    );
    const signer = provider.getSigner();
    const address = await signer.getAddress()
    setAddress(address);



  };

  useEffect(() => {
    initWeb3();
    if (web3Modal && web3Modal.cachedProvider) {
      connect();




    }
  }, []);

  return (
    <div>
      {address ? (
        <span className="bg-gray-200 px-6 py-2 rounded-full">{address}</span>
      ) : (
        <button
          onClick={connect}
          className="bg-gray-200 px-6 py-2 rounded-full"
        >
          Connect
        </button>
      )}
    </div>
  );
}