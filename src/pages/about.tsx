import Image from 'next/image'

import { prisma } from '../db/client';

export default function About(props: any) {
  return (
    <div className="flex flex-col items-center py-2">
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
      <h1 className="font-mono text-5xl text-purple-700 text-opacity-25 hover:text-red-500">{props.questions}</h1>
    </div>
  )
}


export const getServerSideProps = async () => {
  const questions = await prisma.hello.findMany();

  return {
    props: {
      questions: JSON.stringify(questions),
    }
  }
}
