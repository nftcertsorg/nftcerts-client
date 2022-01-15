import { useCallback, useEffect, useState } from "react";
import { getIpfsMetadata, getNfts } from "../utils/api";

export default function CertificatesList({ address }) {
  const [certificates, setCertificates] = useState([]);

  const fetchCertificates = useCallback(async () => {
    if (!address) return;

    setCertificates([]);
  
    const { result } = await getNfts(address);

    if (!result) return;

    const list = await Promise.all(
      result.map(async (nft) => {
        const metadata = await getIpfsMetadata(nft.token_uri);
        return {
          ...nft,
          metadata,
        };
      })
    );
    setCertificates(list);
  }, [address]);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {certificates.map((certificate) => (
        <li key={certificate.block_number} className="relative overflow-hidden">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-green-500 overflow-hidden">
            <img
              src={certificate.metadata.image}
              alt=""
              className="object-cover pointer-events-none group-hover:opacity-75"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">
                View details for {certificate.metadata.name}
              </span>
            </button>
          </div>
          <p className="mt-2 block text-xl font-medium text-gray-900 truncate pointer-events-none">
            {certificate.metadata.name}
          </p>
          <p className="mt-1 block text-sm font-medium text-gray-400 pointer-events-none">
            From {certificate.owner_of}
          </p>
        </li>
      ))}
    </ul>
  );
}
