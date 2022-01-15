import { useEffect, useState } from "react";
import { ethers } from "ethers";

export function useAddress() {
  const [address, setAddress] = useState(null);

  const getAddress = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    setAddress(await signer.getAddress());

  };

  useEffect(() => {
    if (typeof window === undefined) return;

    getAddress();
  }, []);

  return address;
}
