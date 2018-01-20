import { createSelector } from 'reselect'
import zoneManager from '../zone-manager'
import map from '../map'

const zoneCompositionDataSelector = state => state.zoneCompositionData
const zoneJourneyDataSelector = state => state.zoneJourneyData
const zoneJourneyDataFiltersSelector = state => state.zoneJourneyDataFilters

export const hoveredZoneCompositionDataSelector = createSelector(
  [map.selectors.hoveredZoneSelector, zoneCompositionDataSelector],
  (hoveredZone, zoneData) => zoneData[hoveredZone.id]
)

export const originZonesCompositionDataSelector = createSelector(
  [zoneManager.selectors.originZonesSelector, zoneCompositionDataSelector],
  (originZones, zoneData) => {
    return originZones.reduce((data, zone) => {
      data.push({...zoneData[zone.id], id: zone.id, color: zone.color})
      return data
    }, [])
  }
)

export const originZonesJourneyDataSelector = createSelector(
  [zoneManager.selectors.originZonesSelector, zoneJourneyDataSelector],
  (originZones, zoneData) => {
    return originZones.reduce((data, zone) => {
      data.push({...zoneData[zone.id]})
      return data
    }, [])
  }
)

export const destinationZonesCompositionDataSelector = createSelector(
  [zoneManager.selectors.destinationsZonesSelector, zoneCompositionDataSelector],
  (destinationZones, zoneData) => {
    return destinationZones.reduce((data, zone) => {
      data.push({...zoneData[zone.id], id: zone.id, color: zone.color})
      return data
    }, [])
  }
)

export const destinationZonesJourneyDataSelector = createSelector(
  [zoneManager.selectors.destinationsZonesSelector, zoneJourneyDataSelector],
  (destinationZones, zoneData) => {
    return destinationZones.reduce((data, zone) => {
      data.push({...zoneData[zone.id]})
      return data
    }, [])
  }
)
