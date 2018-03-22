import { createSelector } from 'reselect'
import zoneManager from '../zone-manager'
import map from '../map'

const zoneCompositionDataSelector = state => state.zoneCompositionData
const zoneJourneyDataSelector = state => state.zoneJourneyData
// const zoneJourneyDataFiltersSelector = state => state.zoneJourneyDataFilters

export const hoveredZoneCompositionDataSelector = createSelector(
  [map.selectors.hoveredZoneSelector, zoneCompositionDataSelector],
  (hoveredZone, zoneData) => zoneData[hoveredZone.id]
)

const mapGroupsToData = (groups, zoneData) => {
  return groups.reduce((data, group) => {
    const { groupId, zoneIds, ...rest } = group
    const groupZoneData = zoneIds.reduce((data, zoneId) => {
      data.push({zoneId, zoneData: zoneData[zoneId]})
      return data
    }, [])
    data[groupId] = {...rest, groupData: groupZoneData}
    return data
  }, {})
}

export const groupsJourneyDataSelector = createSelector(
  [zoneManager.selectors.allGroupsSelector, zoneJourneyDataSelector],
  mapGroupsToData
)

export const originGroupsCompositionDataSelector = createSelector(
  [zoneManager.selectors.originGroupsSelector, zoneCompositionDataSelector],
  mapGroupsToData
)

export const originGroupsJourneyDataSelector = createSelector(
  [zoneManager.selectors.originGroupsSelector, zoneJourneyDataSelector],
  mapGroupsToData
)

export const destinationGroupsCompositionDataSelector = createSelector(
  [zoneManager.selectors.destinationGroupsSelector, zoneCompositionDataSelector],
  mapGroupsToData
)

export const destinationGroupsJourneyDataSelector = createSelector(
  [zoneManager.selectors.destinationGroupsSelector, zoneJourneyDataSelector],
  mapGroupsToData
)
