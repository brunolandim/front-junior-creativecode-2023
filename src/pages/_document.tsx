import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
      </body>
    </Html>
  );
}
