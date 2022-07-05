import { signIn, signOut, useSession } from "next-auth/react"

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <header className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 lg:fixed lg:w-full lg:top-0 lg:left-0 lg:z-30">
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className="container px-4 py-5 mx-auto space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:space-x-10">
        <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between lg:flex-1 lg:space-x-2">
          <p
          >
            {!session && (
              <>
                <span >
                  You are not signed in
                </span>
                <a 
                  className="flex items-center justify-center h-12 px-4 mt-2 text-sm text-center text-gray-600 transition-colors duration-300 transform border rounded-lg lg:h-10 dark:text-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                  href={`/api/auth/signin`}
                  onClick={(e) => {
                    e.preventDefault()
                    signIn()
                  }}
                >
                  Sign in
                </a>
              </>
            )}
            {session?.user && (
              <>
                <span
                  style={{ backgroundImage: `url(${session.user.image})` }}
                />
                <span >
                  <small>Signed in as</small>
                  <br />
                  <strong>{session.user.email || session.user.name}</strong>
                </span>
                <a
                  className="flex items-center justify-center h-12 px-4 mt-2 text-sm text-center text-gray-600 transition-colors duration-300 transform border rounded-lg lg:h-10 dark:text-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                  href={`/api/auth/signout`}
                  onClick={(e) => {
                    e.preventDefault()
                    signOut()
                  }}
                >
                  Sign out
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </header>
  )
}
