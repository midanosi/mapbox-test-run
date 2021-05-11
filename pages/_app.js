import "../styles/globals.css"
import { Container } from "next/app"
import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <Container>
                <Head>
                    <link
                        href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
                        rel="stylesheet"
                    />
                </Head>
                <Component {...pageProps} />
            </Container>
        </ChakraProvider>
    )
}

export default MyApp
