import '@/styles/reset.scss';
import '@/styles/globals.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Provider } from 'react-redux';

import Preloader from '@/shared/ui/Preloader';
import store from '@/slices';
import Head from "next/head";

const App = (props) => {
  const { Component, pageProps } = props;

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  router.events?.on('routeChangeStart', () => {
    setLoading(true);
  });

  router.events?.on('routeChangeComplete', () => {
    setLoading(false);
  });

  router.events?.on('routeChangeError', () => {
    setLoading(false);
  });

  return (
    <Provider store={store}>
      <Head>
        <meta name="format-detection" content="telephone=no" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      <Component {...pageProps} />
      {loading && <Preloader isGlobal={true} />}
    </Provider>
  );
};

export default App;
