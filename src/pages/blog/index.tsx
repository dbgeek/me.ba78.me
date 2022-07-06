import { GetServerSideProps } from 'next'
import { NextPage } from "next";

import Header from "../../components/header";

interface Props {
  data: string;
}

const Blog: NextPage<Props> = (props) => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="font-mono text-5xl text-purple-700 text-opacity-25 hover:text-red-500 ...">{props.data}</h1>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { data: process.env.GITHUB_ID } }
}

export default Blog;
