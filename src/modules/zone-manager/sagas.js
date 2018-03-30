import { delay } from 'redux-saga'
import { select, put, take, call } from 'redux-saga/effects'
import isEqual from 'lodash.isequal'
import {
  SET_ORIGIN_SELECTION_MODE, SET_DESTINATION_SELECTION_MODE,
  RESET_SELECTION_MODE, REMOVE_GROUP, REQUEST_SUBGRAPHS
} from './actionTypes'
import {
  resetEditingGroup, removeGroup, resetSelectionMode,
  fetchingSubgraphs, receiveSubgraphs, addSubgraphGroup
} from './actions'
import {
  emptyGroupsIdSelector, editingGroupIdSelector, nextSubgraphGroupIdSelector,
  subgraphGroupDataSelector
} from './selectors'
import c from '../../utils/randomColor'

export function * watchForZoneSelectionChanges () {
  while (true) {
    yield take([
      SET_ORIGIN_SELECTION_MODE,
      SET_DESTINATION_SELECTION_MODE,
      RESET_SELECTION_MODE
    ])

    yield put(resetEditingGroup())

    // Remove all empty groups
    const groupIds = yield select(emptyGroupsIdSelector)
    for (let id of groupIds) {
      yield put(removeGroup(id))
    }
  }
}

export function * watchForDeletionOfGroups () {
  while (true) {
    const { groupId } = yield take(REMOVE_GROUP)
    const currentEditingGroupId = yield select(editingGroupIdSelector)
    if (currentEditingGroupId === groupId) {
      yield put(resetSelectionMode())
      yield put(resetEditingGroup())
    }
  }
}

export function * watchForSubgraphRequests () {
  while (true) {
    const { constraints } = yield take(REQUEST_SUBGRAPHS)
    yield put(fetchingSubgraphs())
    yield call(delay, 2000)
    const data = [[10, 11, 12], [13, 14, 15]]
    const existingGroupData = (yield select(subgraphGroupDataSelector))
    const existingZoneIds = existingGroupData.map(g => new Set(g.zoneIds))

    for (let zoneIds of data) {
      const groupId = yield select(nextSubgraphGroupIdSelector)
      const ids = new Set(zoneIds)
      const doZoneIdsExist = existingZoneIds
        .filter(g => isEqual(g, ids))
        .length > 0
      if (!doZoneIdsExist) {
        yield put(addSubgraphGroup(groupId, c.next().value, zoneIds))
      }
    }
    yield put(receiveSubgraphs())
  }
}
