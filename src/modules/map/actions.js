import * as t from './actionTypes'

export const mapHasLoaded = () => ({
  type: t.MAP_HAS_LOADED
})

export const addZoneCompositions = (geojson) => ({
  type: t.ADD_ZONE_COMPOSITION,
  zones: geojson
})

export const addJourneys = geojson => ({
  type: t.ADD_JOURNEYS,
  journeys: geojson
})

export const setFilteredRouteIds = filteredRouteIds => ({
  type: t.SET_FILTERED_ROUTE_IDS,
  filteredRouteIds
})

export const removeJourneys = () => ({
  type: t.REMOVE_JOURNEYS
})

export const hoverOverFeature = feature => ({
  type: t.HOVER_OVER_FEATURE,
  feature
})

export const hoverOverZone = zoneId => ({
  type: t.HOVER_OVER_ZONE,
  zoneId
})

export const toggleLockHoveredZone = () => ({
  type: t.TOGGLE_LOCK_HOVERED_ZONE
})

export const resetLockHoveredZone = () => ({
  type: t.RESET_LOCK_HOVERED_ZONE
})

export const clickFeatures = (features, shiftKey) => ({
  type: t.CLICK_FEATURES,
  features,
  shiftKey
})

export const colorSelectedGroups = groups => ({
  type: t.COLOR_SELECTED_GROUPS,
  groups
})

export const colorSubgraphGroups = groups => ({
  type: t.COLOR_SUBGRAPH_GROUPS,
  groups
})
