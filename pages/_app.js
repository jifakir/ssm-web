import Layout from '../layouts/Layout';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import store from '../store/configureStore';
import '../styles/globals.css';
import 'react-modern-drawer/dist/index.css';
import 'rc-dropdown/assets/index.css';


import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { useRouter } from 'next/router';

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
            {
              router.pathname === '/welcome' ?
                <Component {...pageProps} />:
                <Layout>
                  <Component {...pageProps} />
                </Layout>
            }
          </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
