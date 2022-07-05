import type { NextPage } from 'next';
import Image from 'next/image'

import Header from "../components/header"

const About: NextPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1 lg:mt-20">
        <div className="flex flex-col items-center max-w-lg mx-auto my-16 overflow-hidden bg-white rounded-lg lg:space-x-8 dark:bg-gray-900 lg:max-w-5xl" >
          <div>
            <Image
              priority
              src="https://dtszrqr6lxc1q.cloudfront.net/about/profile.jpg"
              height={144}
              width={144}
              alt="dbgeek"
              className="rounded-full border border-gray-100 shadow-sm"
            />
          </div>
          <h1 className="font-mono text-5xl text-purple-700 text-opacity-25 hover:text-red-500">This is me!</h1>
        </div>
      </main>
    </>
  )
}

export default About
