import React from "react"
import { Layer, Source } from "react-map-gl"

import potholeGeoJSON from "../data/pothole_enquiries_2019.json"
import { addSequentialIdsToGeoJSON } from "../utils/addSequentialIdsToGeoJSON"

const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
        "circle-radius": 5,
        "circle-color": "#007cbf",
    },
}
const mappedGeoJSON = addSequentialIdsToGeoJSON(potholeGeoJSON) // TODO: do this cleaning/modifying with jq and then import that file

const PotholeLayer = () => {
    return (
        <Source id="potholes_2019" type="geojson" data={mappedGeoJSON}>
            <Layer {...layerStyle} />
        </Source>
    )
}

export default PotholeLayer
