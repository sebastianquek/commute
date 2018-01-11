export const originZonesSelector = state => state.zoneManager.categorizedZones.origins
export const destinationsZonesSelector = state => state.zoneManager.categorizedZones.destinations
export const allZoneIdsSelector = state => {
  return [
    ...state.zoneManager.categorizedZones.origins.map(o => o.id),
    ...state.zoneManager.categorizedZones.destinations.map(d => d.id)
  ]
}
export const zoneColorsSelector = state => {
  const origins = state.zoneManager.categorizedZones.origins.reduce((origins, o) => {
    origins[o.id] = o.color
    return origins
  }, {})
  const destinations = state.zoneManager.categorizedZones.destinations.reduce((destinations, d) => {
    destinations[d.id] = d.color
    return destinations
  }, {})
  return {
    ...origins,
    ...destinations
  }
}
