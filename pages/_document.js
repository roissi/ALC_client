import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          {/* balises meta, liens vers des feuilles de style externes, etc. */}
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main /> {/* contenu de l'appli à insérer */}
          <NextScript /> {/* scripts de Next.js injectés */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;