import React from "react"
import { Box, DarkMode } from "@chakra-ui/react"
import ReactMapGL, { NavigationControl } from "react-map-gl"
import AutoSizer from "react-virtualized-auto-sizer"

import {
    isPopupOpenAtom,
    mapStylesAtom,
    selectedPotholeAtom,
    useAtom,
    viewportPropsAtom,
} from "../store"

import PotholeLayer from "./PotholeLayer"
import { PotholePopup } from "./PotholePopup"
import { PresetLocationsButtons } from "./PresetLocationsButtons"
import { ViewportPropsHelper } from "./ViewportPropsHelper"

const ReactMapGLWrapper = ({ height, width }) => {
    const [mapStyle] = useAtom(mapStylesAtom)
    const [viewportProps, setViewportProps] = useAtom(viewportPropsAtom)
    const [, setSelectedPothole] = useAtom(selectedPotholeAtom)
    const [, setIsPopupOpen] = useAtom(isPopupOpenAtom)

    const handleMapClick = (e) => {
        const features = e.features

        const pothole =
            features.find((feature) => feature.source === "potholes_2019") ??
            null // this will be null if map click isn't over a pothole, so this handles deselection too

        setSelectedPothole(pothole)
        setIsPopupOpen(pothole !== null)
    }

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
            onClick={handleMapClick}
        >
            <NavigationControl
                style={{
                    top: 100,
                    right: 10,
                }}
            />
            <PotholeLayer />
            <PotholePopup />
        </ReactMapGL>
    )
}

const MapSection = () => {
    return (
        <Box height="100%" width="100%" position="relative">
            <DarkMode>
                <PresetLocationsButtons />
                <ViewportPropsHelper />
            </DarkMode>
            <AutoSizer>
                {({ height, width }) => (
                    <ReactMapGLWrapper height={height} width={width} />
                )}
            </AutoSizer>
        </Box>
    )
}

export default MapSection
