import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Artificial Life Coach : Unique life coaching, Personalized recommendations & Customizable diary"
          />
          <meta
            name="keywords"
            content="Artificial Intelligence, Life Coach, Agenda, Calendar, Interests"
          />
          <meta name="author" content="Cyril De Graeve" />
          <meta property="og:title" content="Artificial Life Coach" />
          <meta
            property="og:image"
            content="https://artificial-life-coach.vercel.app/img/ALC_og.png"
          />
          <meta
            property="og:url"
            content="https://artificial-life-coach.vercel.app"
          />

          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
