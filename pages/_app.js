import "../styles/globals.css"
import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <>
                <Head>
                    <link
                        href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
                        rel="stylesheet"
                    />
                </Head>
                <Component {...pageProps} />
            </>
        </ChakraProvider>
    )
}

export default MyApp
