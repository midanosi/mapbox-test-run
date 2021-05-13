import React from "react"
import { Button, HStack } from "@chakra-ui/react"
import { FlyToInterpolator } from "react-map-gl"

import { presets } from "../data/presets"
import { useAtom, viewportPropsAtom } from "../store"

export const PresetLocationsButtons = () => {
    const [, setViewportProps] = useAtom(viewportPropsAtom)

    return (
        <HStack position="absolute" zIndex={1} padding={4}>
            {Object.entries(presets).map(([key, vals]) => (
                <Button
                    key={key}
                    variant="outline"
                    colorScheme="blue"
                    onClick={() =>
                        setViewportProps({
                            ...vals,
                            transitionDuration: 2500,
                            transitionInterpolator: new FlyToInterpolator(),
                        })
                    }
                >
                    {key}
                </Button>
            ))}
        </HStack>
    )
}
