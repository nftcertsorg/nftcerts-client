import { useCallback, useEffect, useState } from "react";
import Overview from "../components/CertificatesList";
import SearchBar from "../components/SearchBar";
import { useAddress } from "../hooks/wallet";

export default function Certificates() {
  const [customAddress, setCustomAddress] = useState(null);

  const address = useAddress();

  return (
    <div className="bg-white">
      <SearchBar updateAddress={setCustomAddress} />
      <Overview address={customAddress || address} />
    </div>
  );
}
