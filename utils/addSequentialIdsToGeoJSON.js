export const addSequentialIdsToGeoJSON = (geoJSON) => {
    const features = geoJSON.features.map((feature, idx) => ({
        ...feature,
        id: idx,
    }))
    return {
        ...geoJSON,
        features,
    }
}
