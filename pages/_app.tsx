import Link from 'next/link';
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <Link href="/about">
                  <a className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                    <svg className="h-6 w-6 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-bold">about</span>
                  </a>
                </Link>
              </div>
              <div className="flex items-center space-x-1">
                <Link href="/dogs">
                  <a className="py-5 px-3 text-gray-700 hover:text-gray-900">dogs</a>
                </Link>
                <Link href="/blog">
                  <a className="py-5 px-3 text-gray-700 hover:text-gray-900">blog</a>
                </Link>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
