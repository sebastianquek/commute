import { all, put, take, select, takeEvery } from 'redux-saga/effects'
import { goToAnchor } from 'react-scrollable-anchor'
import zoneData from '../zone-data'
import { MAP_HAS_LOADED, CLICK_FEATURES, HOVER_OVER_FEATURE } from './actionTypes'
import { addZoneCompositions, colorSelectedGroups, toggleLockHoveredZone, resetLockHoveredZone, hoverOverZone } from './actions'
import { hoveredZoneSelector, isHoveredZoneSelectedSelector } from './selectors'
import zoneManager from '../zone-manager'
import c from '../../utils/randomColor'

export function * updateMapOnLoad () {
  const [{ zones }] = yield all([
    take(zoneData.actionTypes.RECEIVE_ZONE_COMPOSITIONS),
    take(MAP_HAS_LOADED)
  ])
  yield put(addZoneCompositions(zones))
  const selectedGroups = yield select(zoneManager.selectors.allGroupsSelector)
  yield put(colorSelectedGroups(selectedGroups))
}

function * handleClick ({ features }) {
  const zone = features.find(f => f.layer.source === 'zones')

  if (zone) {
    const selectionMode = yield select(zoneManager.selectors.zoneSelectionModeSelector)
    const groups = yield select(zoneManager.selectors.allGroupsSelector)
    const zoneId = zone.properties.OBJECTID
    const groupOfZone = groups.find(g => g.zoneIds.includes(zoneId)) || -1
    const allGroupIds = yield select(zoneManager.selectors.allGroupIdsSelector)

    // const isSelected = yield select(isHoveredZoneSelectedSelector)
    // if (!isSelected) yield put(hoverOverZone(zoneId))
    // const hoveredZone = yield select(hoveredZoneSelector)

    if (allGroupIds.includes(groupOfZone.groupId)) {
      // If existing group, scroll to group
      goToAnchor('' + groupOfZone.groupId, false)
    } else if (selectionMode) {
      // If new group and in a zone selection mode, categorise group and zone
      let newGroupId = 0
      if (selectionMode === 'origins') newGroupId = yield select(zoneManager.selectors.nextOriginGroupIdSelector)
      else if (selectionMode === 'destinations') newGroupId = yield select(zoneManager.selectors.nextDestinationGroupIdSelector)

      yield put(zoneManager.actions.addGroup(newGroupId, c.next().value, selectionMode))
      yield put(zoneManager.actions.addZoneToGroup(zoneId, newGroupId))
      // if (hoveredZone.id === zoneId) yield put(resetLockHoveredZone())
    }
    // } else if (hoveredZone.id === zoneId) {
    //   //If the selected zone matches the current hovered zone, toggle lock on hovered zone
    //   yield put(toggleLockHoveredZone())
    // }
  }
}

function * handleHover ({ feature }) {
  const mode = yield select(zoneManager.selectors.zoneSelectionModeSelector)
  if (mode !== null) {
    if (feature.layer.source === 'zones') {
      // Disable highlighting zones if hovered feature has been selected
      // const isSelected = yield select(isHoveredZoneSelectedSelector)
      // if (!isSelected) {
      yield put(hoverOverZone(feature.properties.OBJECTID))
      // }
    }
  }
}

export function * watchForMouseEvents () {
  yield takeEvery(CLICK_FEATURES, handleClick)
  yield takeEvery(HOVER_OVER_FEATURE, handleHover)
}
