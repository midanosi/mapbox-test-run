import React from "react"
import { Box, DarkMode } from "@chakra-ui/react"
import ReactMapGL, { NavigationControl } from "react-map-gl"
import AutoSizer from "react-virtualized-auto-sizer"

import { mapStylesAtom, useAtom, viewportPropsAtom } from "../store"

import PotholeLayer from "./PotholeLayer"
import { PresetLocationsButtons } from "./PresetLocationsButtons"
import { ViewportPropsHelper } from "./ViewportPropsHelper"

const ReactMapGLWrapper = ({ height, width }) => {
    const [mapStyle] = useAtom(mapStylesAtom)
    const [viewportProps, setViewportProps] = useAtom(viewportPropsAtom)

    return (
        <ReactMapGL
            mapboxApiAccessToken={
                process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN
            }
            mapStyle={`mapbox://styles/mapbox/${mapStyle}`}
            // mapStyle="mapbox://styles/midanosi/ckokba5is41ik18qvys8yasgw" // custom style I made in mapbox studio
            onViewportChange={setViewportProps}
            {...viewportProps}
            height={height}
            width={width}
        >
            <NavigationControl
                style={{
                    top: 100,
                    right: 10,
                }}
            />
            <PotholeLayer />
        </ReactMapGL>
    )
}

const MapSection = () => {
    return (
        <>
            <DarkMode>
                <Box height="100%" width="100%" position="relative">
                    <PresetLocationsButtons />
                    <ViewportPropsHelper />
                </Box>
            </DarkMode>
            <AutoSizer>
                {({ height, width }) => (
                    <ReactMapGLWrapper height={height} width={width} />
                )}
            </AutoSizer>
        </>
    )
}

export default MapSection
