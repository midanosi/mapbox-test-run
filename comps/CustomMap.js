import React from "react"
import ReactMapGL, { NavigationControl, FlyToInterpolator } from "react-map-gl"
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
        zoom: 7.738205798290154,
        latitude: 54.65442014953111,
        longitude: -6.601189039648633,
    },
    irelandZoomedIn: {
        zoom: 9.738205798290153,
        latitude: 54.65442014953111,
        longitude: -6.601189039648633,
    },
    US: {
        zoom: 3.1382057982901514,
        latitude: 38.46351765340368,
        longitude: -94.64675601291836,
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
            <HStack position="absolute" zIndex={1} padding={4}>
                {Object.entries(presets).map(([key, vals]) => (
                    <Button
                        variant="outline"
                        colorScheme="blue"
                        onClick={() =>
                            setViewportProps((oldProps) => ({
                                ...oldProps,
                                ...vals,
                            }))
                        }
                    >
                        {key}
                    </Button>
                ))}
            </HStack>
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
                transitionDuration={2000}
                transitionInterpolator={new FlyToInterpolator()}
            >
                <NavigationControl
                    style={{
                        top: 100,
                        right: 10,
                    }}
                />
                <PotholeLayer />
            </ReactMapGL>
        </Box>
    )
}

export default CustomMap
