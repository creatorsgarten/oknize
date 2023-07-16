import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* manifest */}
        <link rel="manifest" href="/manifest.json" />
        <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" defer />

        <script
          dangerouslySetInnerHTML={{
            __html: `
window.OneSignal = window.OneSignal || [];
OneSignal.push(function() {
  OneSignal.init({
    appId: "f6432bfd-08f2-4880-88e5-b057cf6e926d",
    safari_web_id: "web.onesignal.auto.58b504fd-a471-4836-bd65-020899577e4e",
    notifyButton: {
      enable: true,
    },
  });
})`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
