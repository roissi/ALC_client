import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from '../components/Layout';
import '../styles/globals.css';
import theme from "../theme";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDays, faThumbsUp, faComments } from '@fortawesome/free-solid-svg-icons';

// Ajoutez les icônes à la bibliothèque pour une utilisation globale
library.add(faCalendarDays, faThumbsUp, faComments);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;