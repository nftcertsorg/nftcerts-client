import { ethers } from "ethers";
import { getNfts, getIpfsMetadata } from "../utils/api";
import { useState } from "react";
import frame from "../utils/confetti";

export default function Dapp() {
  const [failure, setFailure] = useState(true);
  const [checked, setChecked] = useState(false);

  const checkValidNFT = async (nftArr) => {
    for (const nft of nftArr) {
      const metadata = await getIpfsMetadata(nft.token_uri)
      if (
        metadata.openBadge.badge.id ===
        "0x8058ef7d197fcb7cce0bed53befeb725c3a2b3351d99d14a91a2d578e5bbf109" // hardcoded certificate id
      ) {
        setFailure(false);
        frame();
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
    await checkValidNFT(json.result);
    setChecked(true);
  };

  return (
    <>
      {!checked && (
    <div className="bg-white">
    <div className="max-w-2xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span className="block">Ready to hack?</span>
        <span className="block">Participate in our Ethereum Hackathon.</span>
      </h2>
      <p className="mt-4 text-lg leading-6 text-gray-400">
          In order to particpate you will need to have absolvet the Blockchain fundamentals course and have a NFT certificate as proof in your wallet.
      </p>
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-md shadow">
          <button
            onClick={getNFTs}
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white background-nftcerts-primary hover:bg-green-700"
          >
            Check for qualification
          </button>
        </div>
      </div>
    </div>
  </div>
      )}
      {checked &&
        (failure ? (
          <div className="w-full px-4 pt-16">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl mb-5">
                <span className="block xl:inline">
                  You do not qualify to access the hackathon
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                We were not able to find the correct certificate in your wallet
                to access the hackathon. Please obtain the certificate from your the Blockchain fundamentals course.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full px-4 pt-16">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl mb-5">
                <span className="block xl:inline">Welcome to the hackathon!</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                We were able to find the required certificate in your wallet, we will send you an email with the instructions!
              </p>
            </div>
          </div>
        ))}
    </>
  );
}
