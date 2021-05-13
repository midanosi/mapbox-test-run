import React from "react"
import {
    Center,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    HStack,
    Select,
    Text,
} from "@chakra-ui/react"
import dynamic from "next/dynamic"
import Head from "next/head"

import { PotholeDataList } from "../comps/PotholeDataList"
import { mapStylesAtom, useAtom } from "../store"

export default function Home() {
    const Map = dynamic(() => import("../comps/CustomMap"), {
        loading: () => <p>loading...</p>, // eslint-disable-line react/display-name
        ssr: false,
    })
    const [, setMapStyle] = useAtom(mapStylesAtom)

    return (
        <>
            <Head>
                <title>Mapbox test</title>
                <meta name="description" content="testy test test" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid
                h="100vh"
                w="100vw"
                overflow="hidden"
                templateColumns="400px minmax(0, 5fr)"
                templateRows="150px minmax(0, 6fr)"
                bgColor="blackAlpha.2100"
            >
                <GridItem>
                    <Center bgColor="tomato" color="white" height="100%">
                        <Heading>Mapbox test</Heading>
                    </Center>
                </GridItem>
                <GridItem pos="relative" padding={4}>
                    <Text color="hotpink" pos="absolute" top="0" right="0">
                        map controls (& info?)2
                    </Text>
                    <FormControl>
                        <FormLabel size="md">Map Style</FormLabel>
                        <Select
                            defaultValue="dark"
                            onChange={(e) => setMapStyle(e.target.value)}
                            w={24}
                        >
                            <option value="dark-v10">Dark</option>
                            <option value="streets-v11">Streets</option>
                        </Select>
                    </FormControl>
                    <HStack spacing={4}></HStack>
                </GridItem>
                <GridItem pos="relative">
                    <Center padding={8}>data selection controls</Center>
                    <PotholeDataList />
                </GridItem>
                <GridItem>
                    <Map />
                </GridItem>
            </Grid>
        </>
    )
}
