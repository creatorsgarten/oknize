import Navbar from "@/components/navbar/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Nunito, Noto_Sans_Thai } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer/Footer";
import Head from "next/head";

const nunito = Nunito({ subsets: ["latin"] });
const notosansthai = Noto_Sans_Thai({ subsets: ["thai"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div className={notosansthai.className}>
      <Head>
        <title>OKNIZE</title>
      </Head>

      {router.pathname !== "/create" && <Navbar />}
      <Component {...pageProps} />
      {router.pathname !== "/create" && <Footer />}
    </div>
  );
}
