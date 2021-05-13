import { atom, useAtom } from "jotai"

import { presets } from "./data/presets"

export const viewportPropsAtom = atom(presets.cambridge)

export const mapStylesAtom = atom("dark-v10")

export { useAtom }
