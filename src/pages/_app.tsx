import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <main>
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
}

export default MyApp;
