import Layout from '../layouts/Layout';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import store from '../store/configureStore';
import '../styles/globals.css';
import 'react-modern-drawer/dist/index.css';


import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { useRouter } from 'next/router';

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const showHomePage = process.env.NEXT_PUBLIC_SHOW_LANDING;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
            <Layout>
              <Component {...pageProps} />
            </Layout>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
