import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect'
import isEqual from 'lodash.isequal'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)

export const zoneSelectionModeSelector = state => state.zoneManager.zoneSelectionMode
export const editingGroupIdSelector = state => state.zoneManager.editingGroupId

export const originGroupsSelector = state => state.zoneManager.categorizedZones.origins
export const destinationGroupsSelector = state => state.zoneManager.categorizedZones.destinations

export const originGroupIdsAndColorsSelector = createDeepEqualSelector(
  originGroupsSelector,
  groups => groups.reduce((idsAndColors, g) => {
    const { groupId, color } = g
    return [...idsAndColors, { groupId, color }]
  }, [])
)

export const destinationGroupIdsAndColorsSelector = createDeepEqualSelector(
  destinationGroupsSelector,
  groups => groups.reduce((idsAndColors, g) => {
    const { groupId, color } = g
    return [...idsAndColors, { groupId, color }]
  }, [])
)

export const originZoneIdsSelector = createDeepEqualSelector(
  originGroupsSelector,
  groups => groups.reduce((allZoneIds, g) => {
    return [...allZoneIds, ...g.zoneIds]
  }, [])
)

export const destinationZoneIdsSelector = createDeepEqualSelector(
  destinationGroupsSelector,
  groups => groups.reduce((allZoneIds, g) => {
    return [...allZoneIds, ...g.zoneIds]
  }, [])
)

export const originGroupIdsSelector = createDeepEqualSelector(
  originGroupsSelector,
  groups => groups.map(g => g.groupId)
)

export const destinationGroupIdsSelector = createDeepEqualSelector(
  destinationGroupsSelector,
  groups => groups.map(g => g.groupId)
)

export const allGroupsSelector = createSelector(
  originGroupsSelector,
  destinationGroupsSelector,
  (origins, destinations) => [
    ...origins,
    ...destinations
  ]
)

export const allGroupIdsSelector = createSelector(
  originGroupIdsSelector,
  destinationGroupIdsSelector,
  (origins, destinations) => [
    ...origins,
    ...destinations
  ]
)

export const allZoneIdsSelector = createSelector(
  originZoneIdsSelector,
  destinationZoneIdsSelector,
  (originIds, destinationIds) => [
    ...originIds,
    ...destinationIds
  ]
)

export const groupColorsSelector = createSelector(
  originGroupsSelector,
  destinationGroupsSelector,
  (origins, destinations) => ({
    ...origins.reduce((obj, o) => ({...obj, [o.groupId]: o.color}), {}),
    ...destinations.reduce((obj, d) => ({...obj, [d.groupId]: d.color}), {})
  })
)

export const nextGroupIdSelector = createSelector(
  allGroupIdsSelector,
  groupIds => groupIds.length > 0 ? Math.max(...groupIds) + 1 : 0
)

export const editingGroupSelector = createSelector(
  editingGroupIdSelector,
  allGroupsSelector,
  (groupId, groups) => groups.find(g => g.groupId === groupId)
)

export const emptyGroupsIdSelector = createSelector(
  allGroupsSelector,
  groups => groups.filter(g => g.zoneIds.length === 0).map(g => g.groupId)
)
