import Header from "../../components/header";
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import AccessDenied from "../../components/access-denied";
export default function Dogs() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  console.log(session);

  // When rendering client side don't display anything until loading is complete
  if (loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <AccessDenied/> }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="font-mono text-5xl text-purple-700 text-opacity-25 hover:text-red-500 ...">Dogs</h1>
      </div>
    </>
  )
}
