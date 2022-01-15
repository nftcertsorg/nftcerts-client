import { useCallback, useEffect, useState } from "react";
import Overview from "../components/CertificatesOverview";
import SearchBar from "../components/SearchBar";
import { useAddress } from "../hooks/wallet";
import { getNfts } from "../utils/api";

export default function Certificates() {
  const [nfts, setNfts] = useState([]);
  const [certficates, setCertificates] = useState([]);

  const address = useAddress();

  const getCertificates = useCallback(() => {
    console.log(nfts);
  }, [nfts]);

  const fetchNfts = useCallback(async () => {
    if (!address) return;
    const { result } = await getNfts(address);
    setNfts(result);
  }, [address]);

  useEffect(() => {
    getCertificates();
  }, [getCertificates]);

  useEffect(() => {
    fetchNfts();
  }, [fetchNfts]);

  return (
    <div className="bg-white">
      <SearchBar />
      <Overview />
    </div>
  );
}
