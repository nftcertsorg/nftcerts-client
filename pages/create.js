/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import abi from "../abi.json";
import tokenAddress from "../tokenAddress.json";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Create() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ name: "", description: "" });
  const [signer, setSigner] = useState(null);
  const [userAddr, setUserAddr] = useState(null);

  useEffect(() => {
    fetchSigner();
  }, []);

  const fetchSigner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const _signer = await provider.getSigner();
    let _userAddr = await _signer.getAddress();
    setSigner(_signer);
    setUserAddr(_userAddr);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const onSave = async () => {
    const { name, description, recipientAddress, workUrl, workDescription } =
      formInput;

    if (!name || !description || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
      openBadge: {
        "@context": "https://w3id.org/openbadges/v2",
        type: "Assertion",
        recipient: {
          type: "ethereumAddress",
          identity: recipientAddress,
        },
        issuedOn: Math.round(new Date().getTime() / 1000),
        verification: {
          type: "SignedBadge",
          creator: userAddr,
        },
        badge: {
          type: "BadgeClass",
          id: hashData({ name: name, issuer: userAddr }),
          issuer: {
            id: userAddr,
            type: "ethereumAddress",
          },
        },
        evidence: {
          id: workUrl,
          description: workDescription,
        },
      },
      encryption: false,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      mintNft({ url, recipientAddress });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const hashData = (dataObject) => {
    const stringified = JSON.stringify(dataObject);
    const hashedData = ethers.utils.id(stringified);
    return hashedData;
  };

  const mintNft = async ({ url, recipientAddress }) => {
    console.log("minting");
    // const signer = await provider.getSigner()
    // let userAddr = await signer.getAddress()

    const NFTCerts = new ethers.Contract(
      tokenAddress.tokenAddress,
      abi.abi,
      signer
    );

    const dataObject = {
      issuer: "some address",
      creator: "some address",
    };

    const hashedData = hashData(dataObject);

    let tx = await NFTCerts.mint(recipientAddress, url, hashedData);
    await tx.wait();
  };

  return (
    <>
      <div className="bg-gray-50 p-12">
        <div className="max-w-lg mx-auto shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Certificate Data
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Please enter the data you want to store in the certificate,
                based on the{" "}
                <a
                  className="text-green-600 hover:text-green-800 visited:text-green-600 font-semibold"
                  href="https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html"
                >
                  IMS Open Badges 2.0 Standard
                </a>
                .
              </p>
            </div>
            <div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) =>
                      updateFormInput({ ...formInput, name: e.target.value })
                    }
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="ETH DEV 101"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    onChange={(e) =>
                      updateFormInput({
                        ...formInput,
                        description: e.target.value,
                      })
                    }
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Nft Description"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">
                  Cover photo
                </label>
                {fileUrl && (
                  <div>
                    <img src={fileUrl} alt="cover" />
                  </div>
                )}
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={uploadImage}
                        />
                      </label>
                      <p className="pl-1">for the certifcate image</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between">
                  <label
                    htmlFor="workUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Recipient submission link
                  </label>
                  <span className="text-sm text-gray-500" id="email-optional">
                    Optional
                  </span>
                </div>
                <div className="mt-1">
                  <input
                    id="workUrl"
                    name="workUrl"
                    type="url"
                    onChange={(e) =>
                      updateFormInput({
                        ...formInput,
                        workUrl: e.target.value,
                      })
                    }
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Submission link"
                  ></input>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between">
                  <label
                    htmlFor="workDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Submission comment
                  </label>
                  <span className="text-sm text-gray-500" id="email-optional">
                    Optional
                  </span>
                </div>
                <div className="mt-1">
                  <textarea
                    id="workDescription"
                    name="workDescription"
                    onChange={(e) =>
                      updateFormInput({
                        ...formInput,
                        workDescription: e.target.value,
                      })
                    }
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Submission comment"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient Address
                </label>
                <div className="mt-1">
                  <input
                    id="recipientAddress"
                    name="recipientAddress"
                    type="text"
                    onChange={(e) =>
                      updateFormInput({
                        ...formInput,
                        recipientAddress: e.target.value,
                      })
                    }
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Recipient address"
                  ></input>
                </div>
              </div>

              <div className="relative flex items-start mt-6">
                <div className="flex items-center h-5">
                  <input
                    id="encryptData"
                    aria-describedby="candidates-description"
                    name="encryptData"
                    type="checkbox"
                    className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="encryptData"
                    className="font-medium text-gray-700"
                  >
                    Encrypt
                  </label>
                  <p id="encryptData-description" className="text-gray-500">
                    Check if you want to encrypt the data.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 text-right sm:px-6">
              <button
                onClick={onSave}
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
