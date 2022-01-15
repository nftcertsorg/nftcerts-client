import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

export default function Example() {
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="relative pt-6 pb-16 sm:pb-24">

        <main className="mt-36 mx-auto max-w-7xl px-4 sm:mt-36">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Educational Certificates as NFTs</span>{' '}
              {/* <span className="block text-indigo-600 xl:inline">online business</span> */}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We believe that in the future our digital identity will consist of token assets stored in web3 accounts. In this future we will need to provide a “proof of skill” in our assets to fluently cooperate with others.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="create"
                  className="background-nftcerts-primary w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                >
                  Create Certificate
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="certificate"
                  className="text-nftcerts-primary w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  View Certificate
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}