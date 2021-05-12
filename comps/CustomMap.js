import React from "react"
import ReactMapGL, { NavigationControl, FlyToInterpolator } from "react-map-gl"
import { useMapStyles } from "../hooks/useMapStyles"
import { useViewportProps } from "../hooks/useViewportProps"
import AutoSizer from "react-virtualized-auto-sizer"
import {
    Box,
    HStack,
    Text,
    useClipboard,
    Button,
    DarkMode,
} from "@chakra-ui/react"
import PotholeLayer from "../comps/PotholeLayer"

const CustomMap = () => {
    const { viewportProps, setViewportProps, presets } = useViewportProps()
    const { mapStyle } = useMapStyles()

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
        <DarkMode>
            <Box height="100%" width="100%" position="relative">
                <HStack position="absolute" zIndex={1} padding={4}>
                    {Object.entries(presets).map(([key, vals]) => (
                        <Button
                            variant="outline"
                            colorScheme="blue"
                            onClick={() =>
                                setViewportProps({
                                    ...vals,
                                    transitionDuration: 2500,
                                    transitionInterpolator:
                                        new FlyToInterpolator(),
                                })
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
                    <Button
                        onClick={onCopy}
                        variant="outline"
                        colorScheme="orange"
                        w={16}
                        size="sm"
                    >
                        {hasCopied ? "Copied" : "Copy"}
                    </Button>
                </HStack>
                <AutoSizer>
                    {({ height, width }) => (
                        <ReactMapGL
                            height={height}
                            width={width}
                            mapboxApiAccessToken={
                                process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN
                            }
                            mapStyle={`mapbox://styles/mapbox/${mapStyle}`}
                            // mapStyle="mapbox://styles/midanosi/ckokba5is41ik18qvys8yasgw" // custom style I made in mapbox studio
                            onViewportChange={setViewportProps}
                            {...viewportProps}
                            // transitionDuration={2000}
                            // transitionInterpolator={new FlyToInterpolator()}
                        >
                            <NavigationControl
                                style={{
                                    top: 100,
                                    right: 10,
                                }}
                            />
                            <PotholeLayer />
                        </ReactMapGL>
                    )}
                </AutoSizer>
            </Box>
        </DarkMode>
    )
}

export default CustomMap
