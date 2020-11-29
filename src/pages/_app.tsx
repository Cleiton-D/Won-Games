import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';

import GlobalStyles from 'styles/global';
import theme from 'styles/theme';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Head>
      <title>Won Games</title>
      <link rel="shortcut icon" href="/img/icon-512.png" />
      <link rel="apple-touch-icon" href="/img/icon-512.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="description" content="The best Game Store in the world!" />
    </Head>
    <GlobalStyles />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
