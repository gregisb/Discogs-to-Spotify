import '../styles/global.scss';

import { Provider as NextAuthProvider } from 'next-auth/client';
import { Header } from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </NextAuthProvider>
  );
}

export default MyApp;
