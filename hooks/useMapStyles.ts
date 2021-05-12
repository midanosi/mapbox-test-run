import create from 'zustand'

enum MapStyles {
    dark = "mapbox://styles/mapbox/dark-v10",
    streets = "mapbox://styles/mapbox/streets-v11",
}

type MapStylesState = {
    mapStyle: 'dark-v10' | 'streets-v11'
    setMapStyle: (newMapStyle: MapStylesState["mapStyle"]) => void
}

export const useMapStyles = create<MapStylesState>((set) => ({
    mapStyle: 'dark-v10',
    setMapStyle: (newMapStyle) => set(() => ({mapStyle: newMapStyle})),
}))