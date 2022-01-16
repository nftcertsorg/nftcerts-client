import { BadgeCheckIcon, LockClosedIcon, KeyIcon } from '@heroicons/react/outline'

const features = [
  {
    name: 'IMS Learning Certification Standard',
    description:
      'Our educational certificate NFTs store their data based on one of the most recognised certification standards. The Open Badges standard by the IMS.',
    icon: BadgeCheckIcon,
  },
  {
    name: 'Privacy Enabled',
    description:
      'We allow the recpients of the certificates to encrypt their certificate data and only show the data to whom they choose.',
    icon: KeyIcon,
  },
  {
    name: 'Secure Metadata',
    description:
      'Our contracts store a hash of the meta data to be sure the metadata that is displayed is the same as the data stored.',
    icon: LockClosedIcon,
  },
]

export default function LandingPage() {
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
                  href="certificates"
                  className="text-nftcerts-primary w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  View Certificate
                </a>
              </div>
            </div>
          </div>
        </main>

        <div className="relative bg-grey-50 py-16 sm:py-24 lg:py-40">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="pt-6">
                    <div className="flow-root bg-white rounded-lg px-6 pb-8">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center p-3 bg-gray-700 rounded-md shadow-lg">
                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                        <p className="mt-5 text-base text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">See NFTCerts in action!</span>
                  <span className="block">Test our example Dapp.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-green-200">
                  In this example the particpate of a hackathon first needs to do a course and display the proof of successfully finishing the course with an NFT certificate.
                </p>
                <a
                  href="dapp"
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-nftcerts-primary hover:bg-green-50"
                >
                  Test Demo
                </a>
              </div>
            </div>
            <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <img
                className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                src="example-screen.png"
                alt="App screenshot"
              />
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}