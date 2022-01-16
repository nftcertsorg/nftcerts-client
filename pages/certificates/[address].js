import { ShieldCheckIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useState } from "react";
import { getNft, getIpfsMetadata } from "../../utils/api";
import { truncateAddress, timeConverter } from "../../utils/utils";
import { LockClosedIcon } from "@heroicons/react/solid";
import { decrypt, getPublicKey } from "../../utils/encryption";

function Certificate({ address, id }) {
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState(null);

  const getCertificate = useCallback(async () => {
    if (!address || !id) return;
    const nft = await getNft(address, id);
    const data = await getIpfsMetadata(nft.token_uri);
    console.log(data);
    const metadata = data ? data : {};
    setCertificate({
      ...data,
      metadata,
    });
  }, [address, id]);

  const decryptCertificate = (publicKey) => {
    if (!certificate?.metadata?.encryption || !publicKey) return;

    const encryptedMetadata = certificate.metadata;
    const decryptedMetadata = {
      name: decrypt(encryptedMetadata["name"], publicKey),
      description: decrypt(encryptedMetadata["description"], publicKey),
      image: decrypt(encryptedMetadata["image"], publicKey),
      openBadge: {
        "@context": decrypt(
          encryptedMetadata["openBadge"]["@context"],
          publicKey
        ),
        type: decrypt(encryptedMetadata["openBadge"]["type"], publicKey),
        recipient: {
          type: decrypt(
            encryptedMetadata["openBadge"]["recipient"]["type"],
            publicKey
          ),
          identity: decrypt(
            encryptedMetadata["openBadge"]["recipient"]["identity"],
            publicKey
          ),
        },
        issuedOn: decrypt(
          encryptedMetadata["openBadge"]["issuedOn"],
          publicKey
        ),
        verification: {
          type: decrypt(
            encryptedMetadata["openBadge"]["verification"]["type"],
            publicKey
          ),
          creator: decrypt(
            encryptedMetadata["openBadge"]["verification"]["creator"],
            publicKey
          ),
        },
        badge: {
          type: decrypt(
            encryptedMetadata["openBadge"]["badge"]["type"],
            publicKey
          ),
          id: decrypt(encryptedMetadata["openBadge"]["badge"]["id"], publicKey),
          issuer: {
            id: decrypt(
              encryptedMetadata["openBadge"]["badge"]["issuer"]["id"],
              publicKey
            ),
            type: decrypt(
              encryptedMetadata["openBadge"]["badge"]["issuer"]["type"],
              publicKey
            ),
          },
        },
        evidence: {
          id: decrypt(
            encryptedMetadata["openBadge"]["evidence"]["id"],
            publicKey
          ),
          description: decrypt(
            encryptedMetadata["openBadge"]["evidence"]["description"],
            publicKey
          ),
        },
      },
      encryption: false,
    };
    setCertificate({
      ...certificate,
      metadata: decryptedMetadata,
    });
  };

  useEffect(() => {
    getCertificate();
  }, [getCertificate]);

  if (!certificate) return null;

  const handleDecryption = async () => {
    const publicKey = await getPublicKey();
    try {
      decryptCertificate(publicKey);
    } catch (_e) {
      setError("Invalid Public Key");
    }
  };

  console.log(certificate);

  if (certificate?.metadata?.encryption)
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center">
        <div className="flex flex-col space-y-5">
          <div className="flex justify-center">
            <LockClosedIcon className="text-gray-400 w-64" aria-hidden="true" />
          </div>
          <div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This certificate is encrypted use your public key to decrypt it
            </p>
          </div>
          <div className="text-center">
            <button
              onClick={handleDecryption}
              type="submit"
              disabled={!!error}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:bg-gray-400 disabled:text-gray-700"
            >
              Decrypt
            </button>
            {error && (
              <p className="mt-1 max-w-2xl text-sm text-red-500">{error}</p>
            )}
          </div>
        </div>
      </div>
    );

  return (
    <div className=" min-h-screen flex flex-col lg:flex-row w-full ">
      <div className="bg-slate-100 lg:w-1/2 flex justify-center items-center lg:h-screen lg:sticky lg:top-0">
        <div className="bg-white max-w-lg shadow-2xl shadow-slate-900/5 rounded-xl mx-4 lg:mx-8 my-16 scale-75">
          <img src={certificate.metadata.image} className="w-100 rounded-xl" />
        </div>
      </div>
      <div className=" flex-1 flex justify-center lg:items-center  ">
        <div className="max-w-lg w-full mx-4 lg:mx-8 my-6 lg:my-16">
          <div className="bg-slate-100 text-slate-400 rounded-full p-0.5 inline-flex">
            <svg
              className="w-5 h-5 "
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM9.97999 17.2002L11.9192 11.9594L17.16 10.0202L11.9192 8.08094L9.97999 2.84019L8.04074 8.08094L2.79999 10.0202L8.04074 11.9594L9.97999 17.2002ZM10.9853 11.0255L13.7021 10.0202L10.9853 9.01488L9.97999 6.29805L8.97467 9.01488L6.25784 10.0202L8.97467 11.0255L9.97999 13.7423L10.9853 11.0255Z"
                fill="currentColor"
              />
            </svg>
            <span className="pl-1 pr-2 text-sm font-semibold">NFTCerts</span>
          </div>
          <h1 className="text-2xl font-bold leading-7 text-slate-900 sm:text-3xl mt-4">
            {certificate.metadata.name}
          </h1>
          <p className="text-slate-500 mt-2">
            {certificate.metadata.description}
          </p>
          <div className="mt-5 border-t border-slate-200">
            <dl className="sm:divide-y sm:divide-slate-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">
                  Awarded to
                </dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2 flex  flex-col items-start gap-2">
                  <div className="bg-slate-100 text-slate-400 rounded-full p-0.5 inline-flex items-center ">
                    <img
                      className="inline-block h-5 w-5 rounded-full"
                      src={`https://avatar.tobi.sh/${certificate.metadata.openBadge.recipient.identity}.svg`}
                      alt="0x8DAf30dEa39Fb89c5E039065B7d1973863b38352"
                    />
                    <span className="pl-1 pr-2 text-sm font-medium">
                      {truncateAddress(
                        certificate.metadata.openBadge.recipient.identity
                      )}
                    </span>
                  </div>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">
                  Issued by
                </dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2 flex  flex-col items-start gap-2">
                  <div className="bg-slate-100 text-slate-400 rounded-full p-0.5 inline-flex items-center ">
                    <img
                      className="inline-block h-5 w-5 rounded-full"
                      src={`https://avatar.tobi.sh/${certificate.metadata.openBadge.badge.issuer.id}.svg`}
                      alt="0xCCb807F89269E7d563F83a2a6Cd0383CB8Df406E"
                    />
                    <span className="pl-1 pr-2 text-sm font-medium">
                      {truncateAddress(
                        certificate.metadata.openBadge.badge.issuer.id
                      )}
                    </span>
                  </div>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">
                  Verfication Hash
                </dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  <ShieldCheckIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">Date</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  {timeConverter(certificate.metadata.openBadge.issuedOn)}
                </dd>
              </div>
              {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-slate-500">
                        Score
                      </dt>
                      <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                        7/10
                      </dd>
                    </div> */}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">Comment</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  {certificate.metadata.openBadge.evidence.description}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">Links</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  <ul
                    role="list"
                    className="border border-slate-200 rounded-md divide-y divide-slate-200"
                  >
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-slate-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                        <span className="ml-2 flex-1 w-0 truncate">
                          {certificate.metadata.openBadge.evidence.id}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href={certificate.metadata.openBadge.evidence.id}
                          className="font-medium text-nftcerts-primary hover:text-green-500"
                        >
                          Open
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const rawAddress = params.address;

  const [address, id] = rawAddress.split("--");

  return {
    props: {
      address,
      id,
    },
  };
}
export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export default Certificate;
