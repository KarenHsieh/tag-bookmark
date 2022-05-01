import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'

import { firebaseConfig } from 'utils'

function MyApp({ Component, pageProps, firebaseConfig }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} firebaseConfig={firebaseConfig} />
    </ChakraProvider>
  )
}

MyApp.getInitialProps = async ctx => {
  return { firebaseConfig: firebaseConfig }
}

export default MyApp
