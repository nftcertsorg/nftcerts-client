import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-full relative">
      <Navbar />
      <div className="w-10/12 mx-auto">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
