import React from "react"
import ReactMapGL from "react-map-gl"
import { useMapStyles } from "../hooks/useMapStyles"
import useComponentSize from "@rehooks/component-size"
import { Box } from "@chakra-ui/react"

const CustomMap = () => {
    const ref = React.useRef(null)
    const size = useComponentSize(ref)

    const [viewportProps, setViewportProps] = React.useState(() => ({
        width: size.width,
        height: size.height,
        latitude: 52.2053,
        longitude: 0.1218,
        zoom: 13,
    }))
    const { mapStyle } = useMapStyles()

    React.useEffect(() => {
        setViewportProps((oldProps) => ({ ...oldProps, ...size }))
    }, [size])

    return (
        <Box ref={ref} height="100%">
            <ReactMapGL
                mapboxApiAccessToken={
                    process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN
                }
                mapStyle={`mapbox://styles/mapbox/${mapStyle}`}
                onViewportChange={setViewportProps}
                {...viewportProps}
            />
        </Box>
    )
}

export default CustomMap
