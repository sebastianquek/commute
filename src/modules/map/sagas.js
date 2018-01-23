import { all, put, take, select, takeEvery } from 'redux-saga/effects'
import { goToAnchor } from 'react-scrollable-anchor'
import zoneData from '../zone-data'
import { MAP_HAS_LOADED, CLICK_FEATURES, HOVER_OVER_FEATURE } from './actionTypes'
import { addZoneCompositions, colorSelectedZones, toggleLockHoveredZone, hoverOverZone } from './actions'
import { hoveredZoneSelector, isHoveredZoneSelectedSelector } from './selectors'
import zoneManager from '../zone-manager'
import c from '../../utils/randomColor'

export function * updateMapOnLoad () {
  const [{ zones }] = yield all([
    take(zoneData.actionTypes.RECEIVE_ZONE_COMPOSITIONS),
    take(MAP_HAS_LOADED)
  ])
  yield put(addZoneCompositions(zones))
  const selectedZones = yield select(zoneManager.selectors.allZonesSelector)
  yield put(colorSelectedZones(selectedZones))
}

function * handleClick ({ features }) {
  const zone = features.find(f => f.layer.id === 'zones')

  if (zone) {
    const selectionMode = yield select(zoneManager.selectors.zoneSelectionModeSelector)
    const zoneId = zone.properties.OBJECTID
    const allZoneIds = yield select(zoneManager.selectors.allZoneIdsSelector)

    const isSelected = yield select(isHoveredZoneSelectedSelector)
    if (!isSelected) yield put(hoverOverZone(zoneId))
    const hoveredZone = yield select(hoveredZoneSelector)

    if (allZoneIds.includes(zoneId)) {
      // If existing zone, scroll to zone
      goToAnchor('' + zoneId, false)
    } else if (selectionMode) {
      // If new zone and in a zone selection mode, categorise zone
      yield put(zoneManager.actions.addSelection(zoneId, c.next().value, selectionMode))
    } else if (hoveredZone.id === zoneId) {
      // If the selected zone matches the current hovered zone, toggle lock on hovered zone
      yield put(toggleLockHoveredZone())
    }
  }
}

function * handleHover ({ feature }) {
  if (feature.layer.id === 'zones') {
    // Disable highlighting zones if hovered feature has been selected
    const isSelected = yield select(isHoveredZoneSelectedSelector)
    if (!isSelected) {
      yield put(hoverOverZone(feature.properties.OBJECTID))
    }
  }
}

export function * watchForMouseEvents () {
  yield takeEvery(CLICK_FEATURES, handleClick)
  yield takeEvery(HOVER_OVER_FEATURE, handleHover)
}
