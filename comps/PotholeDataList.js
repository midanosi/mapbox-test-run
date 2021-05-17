import React from "react"
import { Text, VStack } from "@chakra-ui/react"
import { FlyToInterpolator } from "react-map-gl"
import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeList as List } from "react-window"

import potholeGeoJSON from "../data/pothole_enquiries_2019.json"
import { selectedPotholeAtom, useAtom, viewportPropsAtom } from "../store"
import { addSequentialIdsToGeoJSON } from "../utils/addSequentialIdsToGeoJSON"

const mappedGeoJSON = addSequentialIdsToGeoJSON(potholeGeoJSON) // TODO: do this cleaning/modifying with jq and then import that file

const features = mappedGeoJSON.features

const PotholeListRow = ({ index, style }) => {
    const [, setViewportProps] = useAtom(viewportPropsAtom)
    const [selectedPothole, setSelectedPothole] = useAtom(selectedPotholeAtom)
    const feature = features[index]
    const {
        ENQUIRY_CATEGORY: category,
        DATE_RECORDED: dateRecorded,
        DIVISION: division,
        CLIENT_OFFICE_NAME: office,
    } = feature.properties
    const coords = feature.geometry.coordinates

    return (
        <VStack
            style={style}
            cursor="pointer"
            alignItems="start"
            transition="all 0.3s"
            background={index % 2 ? "#e9e6e6" : "#fefefe"}
            padding={4}
            borderRight="5px solid transparent"
            _hover={{
                background: "#716868",
                color: "#fefefe",
                borderRightColor: "tomato",
            }}
            onClick={() => {
                setViewportProps({
                    longitude: coords[0],
                    latitude: coords[1],
                    zoom: 13,
                    transitionDuration: 2000,
                    transitionInterpolator: new FlyToInterpolator(),
                })
                setSelectedPothole(feature)
            }}
        >
            <Text>{category}</Text>
            <Text>{dateRecorded}</Text>
            <Text>{division}</Text>
            <Text fontWeight="bold">{office}</Text>
            {selectedPothole?.id === feature.id ? (
                <Text fontWeight="extrabold" color="tomato" fontSize={24}>
                    SELECTED!
                </Text>
            ) : null}
        </VStack>
    )
}

const PotholeDataList = () => {
    const listRef = React.useRef()
    const [selectedPothole] = useAtom(selectedPotholeAtom)

    React.useEffect(() => {
        const idx = selectedPothole?.id
        if (idx) {
            listRef.current.scrollToItem(idx, "smart")
        }
    }, [selectedPothole])
    return (
        <AutoSizer>
            {({ height, width }) => (
                <List
                    className="pothole-list"
                    ref={listRef}
                    height={height}
                    width={width}
                    itemSize={200}
                    itemCount={features.length}
                    itemData={features}
                >
                    {PotholeListRow}
                </List>
            )}
        </AutoSizer>
    )
}
export { PotholeDataList }
