import React from "react"
import { Box, Button, HStack, Text, useClipboard } from "@chakra-ui/react"

import { useAtom, viewportPropsAtom } from "../store"

export const ViewportPropsHelper = () => {
    const [viewportProps] = useAtom(viewportPropsAtom)

    const { hasCopied, onCopy } = useClipboard(
        JSON.stringify(
            {
                zoom: viewportProps.zoom,
                latitude: viewportProps.latitude,
                longitude: viewportProps.longitude,
            },
            null,
            2,
        ),
    )

    return (
        <HStack
            position="absolute"
            right="0"
            spacing={4}
            paddingY={2}
            paddingX={4}
            bgColor="#0008"
            zIndex={1}
            sx={{
                fontVariantNumeric: "tabular-nums",
            }}
        >
            <Box color="white">
                <HStack>
                    <Text fontWeight="extrabold">Zoom</Text>
                    <Text>{viewportProps.zoom.toFixed(0)}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="extrabold">Lat</Text>
                    <Text>{viewportProps.latitude.toFixed(4)}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="extrabold">Lng</Text>
                    <Text>{viewportProps.longitude.toFixed(4)}</Text>
                </HStack>
            </Box>
            <Button
                onClick={onCopy}
                variant="outline"
                colorScheme="orange"
                w={16}
                size="sm"
            >
                {hasCopied ? "Copied" : "Copy"}
            </Button>
        </HStack>
    )
}
