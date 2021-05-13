import { Button, HStack } from "@chakra-ui/react"
import { viewportPropsAtom, useAtom } from "../store"
import { FlyToInterpolator } from "react-map-gl"
import { presets } from "../data/presets"

export const PresetLocationsButtons = () => {
    const [, setViewportProps] = useAtom(viewportPropsAtom)

    return (
        <HStack position="absolute" zIndex={1} padding={4}>
            {Object.entries(presets).map(([key, vals]) => (
                <Button
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
