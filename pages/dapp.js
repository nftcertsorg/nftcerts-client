import { ethers } from "ethers";
import { getNfts } from "../utils/api";
import { useState } from "react";
import frame from "../utils/confetti";

export default function Dapp() {
  const [failure, setFailure] = useState(false);
  const [checked, setChecked] = useState(false);

  const checkValidNFT = (nftArr) => {
    for (const nft of nftArr) {
      if (
        JSON.parse(nft.metadata).openBadge[0].badge.id ===
        "0xa15535da2a270672c91caa094518f7940cecadcacaf317a17f5ee58a2fded4ce" // hardcoded certificate id
      ) {
        return true;
      }
    }
    return false;
  };

  const getNFTs = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const _signer = await provider.getSigner();
    let _userAddr = await _signer.getAddress();
    const json = await getNfts(_userAddr);
    const valid = checkValidNFT(json.result);
    setChecked(true);
    if (!valid) {
      // change this to modify page change
      setFailure(true);
    } else {
      frame();
    }
  };

  return (
    <>
      {!checked && (
        <div className="w-full px-4 pt-16">
          <div className="text-center mb-10">
            <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl mb-5">
              <span className="block xl:inline">Enter the dApp!</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              You need to have the correct certificate as an NFT in your wallet
              to be able to login.
            </p>
          </div>
          <button
            onClick={getNFTs}
            className="background-nftcerts-primary w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white hover:bg-green-700 md:py-4 md:text-lg md:px-10"
          >
            Check for qualification
          </button>
        </div>
      )}
      {checked &&
        (failure ? (
          <div className="w-full px-4 pt-16">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl mb-5">
                <span className="block xl:inline">
                  You do not qualify to access the dApp :(
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                We were not able to find the correct certificate in your wallet
                to access the dApp. Please obtain the certificate from your
                institution.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full px-4 pt-16">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl mb-5">
                <span className="block xl:inline">Welcome to the dApp!</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                We were able to find the required certificate in your wallet!
              </p>
            </div>
          </div>
        ))}
    </>
  );
}
