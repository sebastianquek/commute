import { createSelector } from 'reselect'

export const zoneSelectionModeSelector = state => state.zoneManager.zoneSelectionMode
export const editingGroupIdSelector = state => state.zoneManager.editingGroupId

export const originGroupsSelector = state => state.zoneManager.categorizedZones.origins
export const destinationGroupsSelector = state => state.zoneManager.categorizedZones.destinations

export const originZoneIdsSelector = createSelector(
  originGroupsSelector,
  groups => groups.reduce((allZoneIds, g) => {
    return [...allZoneIds, ...g.zoneIds]
  }, [])
)

export const destinationZoneIdsSelector = createSelector(
  destinationGroupsSelector,
  groups => groups.reduce((allZoneIds, g) => {
    return [...allZoneIds, ...g.zoneIds]
  }, [])
)

export const originGroupIdsSelector = createSelector(
  originGroupsSelector,
  groups => groups.map(g => g.groupId)
)

export const destinationGroupIdsSelector = createSelector(
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

// export const allZonesSelector = createSelector(
//   originZonesSelector,
//   destinationsZonesSelector,
//   (origins, destinations) => [
//     ...origins,
//     ...destinations
//   ]
// )

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
