import React from "react"
import ReactMapGL from "react-map-gl"
import { useMapStyles } from "../hooks/useMapStyles"
import useComponentSize from "@rehooks/component-size"
import {
    Box,
    HStack,
    Text,
    useClipboard,
    Button,
    DarkMode,
} from "@chakra-ui/react"
import PotholeLayer from "../comps/PotholeLayer"

const presets = {
    ireland: {
        latitude: 1,
        longitude: 1,
        zoom: 10,
    },
    irelandZoomedIn: {
        latitude: 1,
        longitude: 1,
        zoom: 13,
    },
    US: {
        latitude: 1,
        longitude: 1,
        zoom: 2,
    },
    cambridge: {
        latitude: 52.2053,
        longitude: 0.1218,
        zoom: 13,
    },
}

const CustomMap = () => {
    const ref = React.useRef(null)
    const size = useComponentSize(ref)

    const [viewportProps, setViewportProps] = React.useState(() => ({
        width: size.width,
        height: size.height,
        ...presets.cambridge,
    }))
    const { mapStyle } = useMapStyles()

    React.useEffect(() => {
        setViewportProps((oldProps) => ({ ...oldProps, ...size }))
    }, [size])

    const { hasCopied, onCopy } = useClipboard(
        JSON.stringify(
            {
                zoom: viewportProps.zoom,
                latitude: viewportProps.latitude,
                longitude: viewportProps.longitude,
            },
            null,
            2,
        ),
    )

    return (
        <Box ref={ref} height="100%" position="relative">
            <HStack
                position="absolute"
                right="0"
                spacing={4}
                paddingY={2}
                paddingX={4}
                bgColor="#0008"
                zIndex={1}
                sx={{
                    fontVariantNumeric: "tabular-nums",
                }}
            >
                <Box color="white">
                    <HStack>
                        <Text fontWeight="extrabold">Zoom</Text>
                        <Text>{viewportProps.zoom.toFixed(0)}</Text>
                    </HStack>
                    <HStack>
                        <Text fontWeight="extrabold">Lat</Text>
                        <Text>{viewportProps.latitude.toFixed(4)}</Text>
                    </HStack>
                    <HStack>
                        <Text fontWeight="extrabold">Lng</Text>
                        <Text>{viewportProps.longitude.toFixed(4)}</Text>
                    </HStack>
                </Box>
                <DarkMode>
                    <Button
                        onClick={onCopy}
                        variant="outline"
                        colorScheme="orange"
                        w={16}
                        size="sm"
                    >
                        {hasCopied ? "Copied" : "Copy"}
                    </Button>
                </DarkMode>
            </HStack>
            <ReactMapGL
                mapboxApiAccessToken={
                    process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN
                }
                mapStyle={`mapbox://styles/mapbox/${mapStyle}`}
                // mapStyle="mapbox://styles/midanosi/ckokba5is41ik18qvys8yasgw" // custom style I made in mapbox studio
                onViewportChange={setViewportProps}
                {...viewportProps}
            >
                <PotholeLayer />
            </ReactMapGL>
        </Box>
    )
}

export default CustomMap
