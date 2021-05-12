import "../styles/globals.css"
import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider as JotaiProvider } from "jotai"

function MyApp({ Component, pageProps }) {
    return (
        <JotaiProvider>
            <ChakraProvider>
                <Head>
                    <link
                        href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
                        rel="stylesheet"
                    />
                </Head>
                <Component {...pageProps} />
            </ChakraProvider>
        </JotaiProvider>
    )
}

export default MyApp
