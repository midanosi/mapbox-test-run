import React from "react"
import ReactMapGL from "react-map-gl"
import { useMapStyles } from "../hooks/useMapStyles"
import useComponentSize from "@rehooks/component-size"
import { Box } from "@chakra-ui/react"
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

    return (
        <Box ref={ref} height="100%" position="relative">
        <Box ref={ref} height="100%">
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
