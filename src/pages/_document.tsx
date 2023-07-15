import Navbar from "@/components/navbar/Navbar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Navbar />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
