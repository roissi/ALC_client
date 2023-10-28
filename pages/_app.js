import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../themes/theme";
import Layout from "../components/Layout";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";

library.add(faComments);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
