import { atom, useAtom } from "jotai"

import { presets } from "./data/presets"

export const viewportPropsAtom = atom(presets.irelandZoomedIn)
export const mapStylesAtom = atom("dark-v10")
export const selectedPotholeAtom = atom(null)
export const isPopupOpenAtom = atom(false)

export { useAtom }
