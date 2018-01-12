import { createSelector } from 'reselect'

export const originZonesSelector = state => state.zoneManager.categorizedZones.origins
export const destinationsZonesSelector = state => state.zoneManager.categorizedZones.destinations

export const allZoneIdsSelector = createSelector(
  originZonesSelector,
  destinationsZonesSelector,
  (origins, destinations) => [
    ...origins.map(o => o.id),
    ...destinations.map(d => d.id)
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
