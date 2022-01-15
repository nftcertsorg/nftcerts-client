import { SearchIcon } from '@heroicons/react/solid'

export default function SearchBar() {
  return (

    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div>
          <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="address"
              id="address"
              className="focus:ring-green-500 focus:border-green-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="0x0000...0000"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}