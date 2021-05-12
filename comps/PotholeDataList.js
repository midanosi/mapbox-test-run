import potholeGeoJSON from "../data/pothole_enquiries_2019.json"
import { FixedSizeList as List } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import { VStack, Text } from "@chakra-ui/react"

const features = potholeGeoJSON.features

const PotholeListRow = ({ index, style }) => {
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
            onClick={() => alert(JSON.stringify(coords))}
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
        >
            <Text>{category}</Text>
            <Text>{dateRecorded}</Text>
            <Text>{division}</Text>
            <Text fontWeight="bold">{office}</Text>
        </VStack>
    )
}

const PotholeDataList = () => {
    return (
        <AutoSizer>
            {({ height, width }) => (
                <List
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
