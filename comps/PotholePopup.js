import React from "react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { HStack, Link, Text, VStack } from "@chakra-ui/react"
import { formatRFC7231, parse } from "date-fns"
import Image from "next/image"
import { Popup } from "react-map-gl"

import { isPopupOpenAtom, selectedPotholeAtom, useAtom } from "../store"

const PotholeInfo = ({ pothole }) => {
    let dateRecorded = pothole.properties.DATE_RECORDED
    dateRecorded = formatRFC7231(
        parse(dateRecorded, "dd/MM/yyyy HH:mm", new Date()),
    )

    const imgKey = pothole.id % 2 ? "leaf" : "puddle"
    const url = `/${imgKey}-large.jpg`

    return (
        <VStack maxWidth="200" padding={2}>
            <HStack>
                <Text size="sm">{dateRecorded}</Text>
            </HStack>
            <HStack>
                <Image
                    layout="intrinsic"
                    width="100"
                    height="100"
                    alt={`image of a ${imgKey} in a pothole`}
                    src={url}
                />
                <Link href={url} color="teal.500" isExternal>
                    Open image in new tab <ExternalLinkIcon mx="2px" />
                </Link>
            </HStack>
        </VStack>
    )
}

const PotholePopup = () => {
    const [selectedPothole] = useAtom(selectedPotholeAtom)
    const [isPopupOpen, setIsPopupOpen] = useAtom(isPopupOpenAtom)

    return (
        <>
            {isPopupOpen && selectedPothole ? (
                <Popup
                    tipSize={5}
                    anchor="top"
                    longitude={selectedPothole.geometry.coordinates[0]}
                    latitude={selectedPothole.geometry.coordinates[1]}
                    closeOnClick={false}
                    onClose={setIsPopupOpen}
                >
                    <PotholeInfo pothole={selectedPothole} />
                </Popup>
            ) : null}
        </>
    )
}
export { PotholePopup }
