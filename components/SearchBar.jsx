import { SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";

export default function SearchBar({ updateAddress }) {
  const [address, setAddress] = useState(null);
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div>
          <label
            htmlFor="account-number"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <div className="flex">
            <div className="mt-1 relative rounded-md shadow-sm w-full">
              <input
                type="text"
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                className="focus:ring-green-500 focus:border-green-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="0x0000...0000"
              />
            </div>
            <button
              onClick={() => {
                console.log('saving');
                updateAddress(address);
              }}
              className="flex px-3 mt-1 ml-3 cursor-pointer rounded-lg border-gray-300 border-solid border items-center"
            >
              <SearchIcon
                className="h-5 w-5 text-gray-400 cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
