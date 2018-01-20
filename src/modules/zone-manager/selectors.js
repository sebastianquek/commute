import { createSelector } from 'reselect'

export const originZonesSelector = state => state.zoneManager.categorizedZones.origins
export const destinationsZonesSelector = state => state.zoneManager.categorizedZones.destinations

export const numOriginZonesSelector = createSelector(
  originZonesSelector,
  originZones => originZones.length
)

export const originZoneIdsSelector = createSelector(
  originZonesSelector,
  origins => origins.map(o => o.id)
)

export const destinationsZoneIdsSelector = createSelector(
  destinationsZonesSelector,
  destinations => destinations.map(d => d.id)
)

export const allZoneIdsSelector = createSelector(
  originZoneIdsSelector,
  destinationsZoneIdsSelector,
  (originIds, destinationIds) => [
    ...originIds,
    ...destinationIds
  ]
)

export const zoneColorsSelector = createSelector(
  originZonesSelector,
  destinationsZonesSelector,
  (origins, destinations) => ({
    ...origins.reduce((obj, o) => ({...obj, [o.id]: o.color}), {}),
    ...destinations.reduce((obj, d) => ({...obj, [d.id]: d.color}), {})
  })
)
