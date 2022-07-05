import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app'
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { AppType } from 'next/dist/shared/lib/utils';
import type { AppRouter } from "../backend/router";


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
    >
      <div id="app" className="flex flex-col min-h-screen font-roboto dark:bg-gray-900">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return ""; // Browser should use current path
  if (process.env.NEXTAUTH_URL) return `https://${process.env.NEXTAUTH_URL}`; // SSR should use url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;
    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
