import Overview from "../components/CertificatesOverview";
import SearchBar from "../components/SearchBar";

export default function Certificates() {
  return (
    <div className="bg-white">
      <SearchBar />
      <Overview />
    </div>
  );
}