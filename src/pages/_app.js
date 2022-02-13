import '../styles/global.scss';

import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { ListContext, ListContextProvider } from '../../context';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ListContextProvider>
      <NextAuthProvider session={session}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </NextAuthProvider>
    </ListContextProvider>
  );
}

export default MyApp;
