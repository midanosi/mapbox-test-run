import React from "react"
import ReactMapGL, { NavigationControl } from "react-map-gl"
import AutoSizer from "react-virtualized-auto-sizer"
import { Box, DarkMode } from "@chakra-ui/react"
import PotholeLayer from "./PotholeLayer"
import { viewportPropsAtom, useAtom, mapStylesAtom } from "../store"
import { PresetLocationsButtons } from "./PresetLocationsButtons"
import { ViewportPropsHelper } from "./ViewportPropsHelper"

const CustomMap = () => {
    const [mapStyle] = useAtom(mapStylesAtom)
    const [viewportProps, setViewportProps] = useAtom(viewportPropsAtom)

    return (
        <DarkMode>
            <Box height="100%" width="100%" position="relative">
                <PresetLocationsButtons />
                <ViewportPropsHelper />

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
