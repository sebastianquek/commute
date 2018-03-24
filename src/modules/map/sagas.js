import { all, call, put, take, select, takeEvery } from 'redux-saga/effects'
import { goToAnchor } from 'react-scrollable-anchor'
import zoneData from '../zone-data'
import { MAP_HAS_LOADED, CLICK_FEATURES, HOVER_OVER_FEATURE } from './actionTypes'
import {
  addZoneCompositions, addJourneys, removeJourneys, colorSelectedGroups,
  hoverOverZone, setFilteredRouteIds
} from './actions'
import zoneManager from '../zone-manager'
import c from '../../utils/randomColor'

export function * updateMapOnLoad () {
  // Waits for both actions to be called
  const [{ zones }] = yield all([
    take(zoneData.actionTypes.RECEIVE_ZONE_COMPOSITIONS),
    take(MAP_HAS_LOADED)
  ])
  yield put(addZoneCompositions(zones))
  const selectedGroups = yield select(zoneManager.selectors.allGroupsSelector)
  yield put(colorSelectedGroups(selectedGroups))
}

export function * updateJourneys () {
  // Handle first load
  const [{ journeys }, { filteredRouteIds }] = yield all([
    take(zoneData.actionTypes.RECEIVE_ZONE_JOURNEYS),
    take(zoneData.actionTypes.SET_FILTERED_ROUTE_IDS),
    take(MAP_HAS_LOADED)
  ])
  yield put(addJourneys(journeys))
  yield put(setFilteredRouteIds(filteredRouteIds))

  // Handle subsequent zone journey changes
  while (true) {
    const action = yield take([
      zoneData.actionTypes.RECEIVE_ZONE_JOURNEYS,
      zoneData.actionTypes.SET_FILTERED_ROUTE_IDS,
      zoneData.actionTypes.REMOVE_ZONE_JOURNEYS
    ])
    switch (action.type) {
      case zoneData.actionTypes.RECEIVE_ZONE_JOURNEYS:
        yield put(addJourneys(action.journeys))
        break
      case zoneData.actionTypes.SET_FILTERED_ROUTE_IDS:
        yield put(setFilteredRouteIds(action.filteredRouteIds))
        break
      case zoneData.actionTypes.REMOVE_ZONE_JOURNEYS:
        yield put(removeJourneys())
        break
    }
  }
}

function * handleClick ({ features, shiftKey }) {
  const zone = features.find(f => f.layer.source === 'zones')

  if (zone) {
    const zoneId = zone.properties.OBJECTID
    const groups = yield select(zoneManager.selectors.allGroupsSelector)
    const groupOfZone = groups.find(g => g.zoneIds.includes(zoneId)) || -1
    const allGroupIds = yield select(zoneManager.selectors.allGroupIdsSelector)
    const selectionMode = yield select(zoneManager.selectors.zoneSelectionModeSelector)

    // If origin/destination selection mode
    //    clicking an existing zone will scroll to it
    //    shift clicking will add/delete clicked zone
    //    clicking a new zone will add it to a new group
    // If editing selection mode
    //    clicking a new zone will add it to the current group
    //    clicking an existing zone will remove it from the current group
    // If not in selection mode
    //    clicking an existing zone will scroll to it

    if (selectionMode === 'origins' || selectionMode === 'destinations') {
      if (!shiftKey && allGroupIds.includes(groupOfZone.groupId)) {
        yield call(goToAnchor, '' + groupOfZone.groupId, false)
      } else {
        let groupId = yield select(zoneManager.selectors.editingGroupIdSelector)
        if (groupId === null || !shiftKey) { // create a new group
          yield call(createNewGroup, selectionMode)
        }
        const editingGroup = yield select(zoneManager.selectors.editingGroupSelector)
        if (shiftKey) {
          yield call(editGroup, editingGroup, zoneId, groupOfZone.groupId)
        } else {
          yield put(zoneManager.actions.addZoneToGroup(zoneId, editingGroup.groupId))
        }
      }
    } else if (selectionMode === 'edit') {
      const editingGroup = yield select(zoneManager.selectors.editingGroupSelector)
      yield call(editGroup, editingGroup, zoneId, groupOfZone.groupId)
    } else {
      if (allGroupIds.includes(groupOfZone.groupId)) {
        yield call(goToAnchor, '' + groupOfZone.groupId, false)
      }
    }
  }
}

function * createNewGroup (selectionMode) {
  const groupId = yield select(zoneManager.selectors.nextGroupIdSelector)
  yield put(zoneManager.actions.addGroup(groupId, c.next().value, selectionMode))
  yield put(zoneManager.actions.setEditingGroupId(groupId))
}

function * editGroup (editingGroup, zoneId, groupIdOfZone) {
  const allZoneIds = yield select(zoneManager.selectors.allZoneIdsSelector)
  if (editingGroup.zoneIds.includes(zoneId)) { // remove existing zone
    yield put(zoneManager.actions.removeZoneFromGroup(zoneId, editingGroup.groupId))
  } else if (!allZoneIds.includes(zoneId)) { // add to current group if zone has not been added before
    yield put(zoneManager.actions.addZoneToGroup(zoneId, editingGroup.groupId))
  } else {
    yield call(goToAnchor, '' + groupIdOfZone, false)
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
