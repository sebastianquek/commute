import * as t from './actionTypes'
import { goToAnchor } from 'react-scrollable-anchor'
import { hoveredZoneSelector, isHoveredZoneSelectedSelector } from './selectors'
import zoneManager from './../zone-manager'

export const mapHasLoaded = () => ({
  type: t.MAP_HAS_LOADED
})

export const addZoneCompositions = (geojson) => ({
  type: t.ADD_ZONE_COMPOSITION,
  zones: geojson
})

const hoverOverZone = zoneId => ({
  type: t.HOVER_OVER_ZONE,
  zoneId
})

export function hoverOverFeature (feature) {
  return (dispatch, getState) => {
    if (feature.layer.id === 'zones') {
      // Disable highlighting zones if hovered feature has been selected
      if (!isHoveredZoneSelectedSelector(getState())) {
        dispatch(hoverOverZone(feature.properties.OBJECTID))
      }
    }
  }
}

const toggleLockHoveredZone = zoneId => ({
  type: t.TOGGLE_LOCK_HOVERED_ZONE
})

export function selectFeature (feature) {
  return (dispatch, getState) => {
    if (feature.layer.id === 'zones') {
      const hoveredZone = hoveredZoneSelector(getState())
      // Toggle lock on hovered zone if the selected zone matches the current hovered zone
      if (hoveredZone.id === feature.properties.OBJECTID) {
        dispatch(toggleLockHoveredZone())
      } else {
        // Check if it's possible to scroll to selected zone
        if (zoneManager.selectors.allZoneIdsSelector(getState()).includes(feature.properties.OBJECTID)) {
          goToAnchor('' + feature.properties.OBJECTID, false)
        }
      }
    }
  }
}

export const colorSelectedZones = zones => ({
  type: t.COLOR_SELECTED_ZONES,
  zones
})
