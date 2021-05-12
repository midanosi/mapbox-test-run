import { Layer, Source } from "react-map-gl"
import potholeGeoJSON from "../data/pothole_enquiries_2019.json"

const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
        "circle-radius": 5,
        "circle-color": "#007cbf",
    },
}

const PotholeLayer = () => {
    return (
        <Source id="potholes_2019" type="geojson" data={potholeGeoJSON}>
            <Layer {...layerStyle} />
        </Source>
    )
}

export default PotholeLayer
