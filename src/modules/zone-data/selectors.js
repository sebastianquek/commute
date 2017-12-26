import { createSelector } from 'reselect'

export const currentZoneSelector = state => state.map.currentZone
const originZonesSelector = state => state.zoneManager.categorizedZones.origins
const destinationZonesSelector = state => state.zoneManager.categorizedZones.destinations
const zoneDataSelector = state => state.zoneData.zoneData

export const currentZoneDataSelector = createSelector(
  [currentZoneSelector, zoneDataSelector],
  (currentZone, zoneData) => zoneData[currentZone.id]
)

export const originZonesDataSelector = createSelector(
  [originZonesSelector, zoneDataSelector],
  (originZones, zoneData) => {
    return originZones.reduce((data, zoneId) => {
      data.push({...zoneData[zoneId], id: zoneId})
      return data
    }, [])
  }
)

export const destinationZonesDataSelector = createSelector(
  [destinationZonesSelector, zoneDataSelector],
  (destinationZones, zoneData) => {
    return destinationZones.reduce((data, zoneId) => {
      data.push({...zoneData[zoneId], id: zoneId})
      return data
    }, [])
  }
)
