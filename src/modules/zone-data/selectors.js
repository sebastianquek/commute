import { createSelector } from 'reselect'
import zoneManager from '../zone-manager'
import map from '../map'

const zoneCompositionDataSelector = state => state.zoneCompositionData
export const zoneJourneyDataSelector = state => state.zoneJourneyData
export const routeChoicesFiltersSelector = state => state.routeChoicesFilters
export const filteredRouteIds = createSelector(
  routeChoicesFiltersSelector,
  filters => filters.filteredRouteIds
)

export const routeChoicesFilterMaxDuration = createSelector(
  routeChoicesFiltersSelector,
  filters => filters.duration[1]
)

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

export const zoneNamesSelector = createSelector(
  zoneCompositionDataSelector,
  compositionData => {
    return Object.keys(compositionData)
      .map(Number)
      .reduce((zoneNamesMap, id) => {
        const name = compositionData[id].SUBZONE_N
          .toLowerCase()
          .split(' ')
          .map(c => `${c.substring(0, 1).toUpperCase()}${c.substring(1)}`)
          .join(' ')
        zoneNamesMap[id] = name
        return zoneNamesMap
      }, {})
  }
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

export const shouldRouteChoicesChartUpdate = state =>
  state.zoneDataInterfaceFlags.shouldRouteChoicesChartUpdate

export const isFetchingZoneJourneyData = state =>
  state.zoneDataInterfaceFlags.isFetchingZoneJourneyData
