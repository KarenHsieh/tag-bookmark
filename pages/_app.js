// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'

import { firebaseConfig } from 'utils'

function MyApp({ Component, pageProps, firebaseConfig, firebaseAPP }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} firebaseAPP={firebaseAPP} firebaseConfig={firebaseConfig} />
    </ChakraProvider>
  )
}

MyApp.getInitialProps = async ctx => {
  // const firebaseAPP = initializeApp(firebaseConfig)
  // return { firebaseConfig: firebaseConfig, firebaseAPP: firebaseAPP }
  return { firebaseConfig: firebaseConfig }
}

export default MyApp
