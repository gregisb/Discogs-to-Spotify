import '../styles/global.scss';

import { Provider as NextAuthProvider } from 'next-auth/client';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { ListContext, ListContextProvider } from '../../context';

function MyApp({ Component, pageProps }) {
  return (
    <ListContextProvider>
      <NextAuthProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </NextAuthProvider>
    </ListContextProvider>
  );
}

export default MyApp;
