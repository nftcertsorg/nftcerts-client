import WalletConnect from "./WalletConnect";

export default function Navbar() {
  return (
    <div className="flex justify-between w-10/12 mx-auto py-6">
      <div className="text-2xl">NFTCerts</div>
      <div>
        <WalletConnect />
      </div>
    </div>
  );
}
