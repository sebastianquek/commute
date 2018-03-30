import * as t from './actionTypes'

export const addGroup = (groupId, color, category) => ({
  type: t.ADD_GROUP,
  groupId,
  color,
  category
})

export const removeGroup = groupId => ({
  type: t.REMOVE_GROUP,
  groupId
})

export const addZoneToGroup = (zoneId, groupId) => ({
  type: t.ADD_ZONE_TO_GROUP,
  zoneId,
  groupId
})

export const removeZoneFromGroup = (zoneId, groupId) => ({
  type: t.REMOVE_ZONE_FROM_GROUP,
  zoneId,
  groupId
})

export const resetSelectionMode = () => ({
  type: t.RESET_SELECTION_MODE
})

export const setOriginSelectionMode = () => ({
  type: t.SET_ORIGIN_SELECTION_MODE
})

export const setDestinationSelectionMode = () => ({
  type: t.SET_DESTINATION_SELECTION_MODE
})

export const setEditSelectionMode = () => ({
  type: t.SET_EDIT_SELECTION_MODE
})

export const setEditingGroupId = groupId => ({
  type: t.SET_EDITING_GROUP,
  groupId
})

export const resetEditingGroup = () => ({
  type: t.RESET_EDITING_GROUP
})

export const addSubgraphGroup = (groupId, color, zoneIds) => ({
  type: t.ADD_SUBGRAPH_GROUP,
  groupId,
  color,
  zoneIds
})

export const removeSubgraphGroup = groupId => ({
  type: t.REMOVE_SUBGRAPH_GROUP,
  groupId
})

export const hideSubgraphGroup = groupId => ({
  type: t.HIDE_SUBGRAPH_GROUP,
  groupId
})

export const showSubgraphGroup = groupId => ({
  type: t.SHOW_SUBGRAPH_GROUP,
  groupId
})
