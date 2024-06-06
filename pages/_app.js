import '@/styles/reset.scss';
import '@/styles/globals.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';

import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Provider } from 'react-redux';

import Preloader from '@/shared/ui/Preloader';
import store from '@/slices';

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

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
                (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) { return; }
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                
                ym(97506550, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
                });
              `,
          }}
        />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q8LQ4WW045"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-Q8LQ4WW045');
              `,
          }}
        />
      </Head>
      <Component {...pageProps} />
      {loading && <Preloader isGlobal={true} />}
    </Provider>
  );
};

export default App;
