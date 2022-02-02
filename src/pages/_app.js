import '../styles/global.scss';

import { Provider as NextAuthProvider } from 'next-auth/client';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { ListContext, ListContextProvider } from '../../context';

function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <ListContextProvider>
        <Component {...pageProps} />
      </ListContextProvider>
      <Footer />
    </NextAuthProvider>
  );
}

export default MyApp;
