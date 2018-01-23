import * as t from './actionTypes'

export const mapHasLoaded = () => ({
  type: t.MAP_HAS_LOADED
})

export const addZoneCompositions = (geojson) => ({
  type: t.ADD_ZONE_COMPOSITION,
  zones: geojson
})

export const hoverOverFeature = feature => ({
  type: t.HOVER_OVER_FEATURE,
  feature
})

export const hoverOverZone = zoneId => ({
  type: t.HOVER_OVER_ZONE,
  zoneId
})

export const toggleLockHoveredZone = zoneId => ({
  type: t.TOGGLE_LOCK_HOVERED_ZONE
})

export const clickFeatures = features => ({
  type: t.CLICK_FEATURES,
  features
})

export const colorSelectedZones = zones => ({
  type: t.COLOR_SELECTED_ZONES,
  zones
})
