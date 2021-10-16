
import '../styles/global.scss';

import {Header} from '../components/Header'
import { Footer } from '../components/Footer';
import { Provider as NextAuthProvider} from 'next-auth/client';


function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </NextAuthProvider>
  )
}

export default MyApp
