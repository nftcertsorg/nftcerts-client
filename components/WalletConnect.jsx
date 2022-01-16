import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { truncateAddress } from "../utils/utils";


const providerOptions = {
  /* See Provider Options Section */
};

let web3Modal = null;

export default function WalletConnect() {
  const [address, setAddress] = useState('');

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
    setAddress(await signer.getAddress());
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
        <span className="bg-slate-100 text-slate-400 rounded-full p-0.5 inline-flex items-center ">
        <img
          className="inline-block h-5 w-5 rounded-full"
          src={`https://avatar.tobi.sh/${address}.svg`}
          alt="0x8DAf30dEa39Fb89c5E039065B7d1973863b38352"
        />
        <span className="pl-1 pr-2 text-sm font-medium">
          {truncateAddress(address)}
        </span>
      </span>
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