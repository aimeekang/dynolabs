import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <main>
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
};

export default MyApp;
