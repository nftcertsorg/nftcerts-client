const certificates = [
  {
    name: 'Ethereum Intro',
    issuer: 'moritzfelipe.eth',
    source:
      'https://i.imgur.com/oIJgt1M.png',
  },
  {
    name: 'Solidity Development 101',
    issuer: 'moritzfelipe.eth',
    source:
      'https://i.imgur.com/v4oEOaG.png',
  }
  // More files...
]

export default function CertifiateOverview() {
  return (
    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {certificates.map((certificate) => (
        <li key={certificate.source} className="relative">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-green-500 overflow-hidden">
            <img src={certificate.source} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
            <button type="button" className="absolute inset-0 focus:outline-none">
              <span className="sr-only">View details for {certificate.title}</span>
            </button>
          </div>
          <p className="mt-2 block text-xl font-medium text-gray-900 truncate pointer-events-none">{certificate.name}</p>
          <p className="mt-1 block text-sm font-medium text-gray-400 pointer-events-none">From {certificate.issuer}</p>
        </li>
      ))}
    </ul>
  )
}