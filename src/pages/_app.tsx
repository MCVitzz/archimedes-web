import type { AppProps } from 'next/app'
import '@styles/globals.scss'
import { Box, ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box minH="100vh">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
