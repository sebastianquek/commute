import { select, takeEvery, put, take } from 'redux-saga/effects'
import { RESET_EDITING_GROUP, SET_ORIGIN_SELECTION_MODE, SET_DESTINATION_SELECTION_MODE, RESET_SELECTION_MODE } from './actionTypes'
import { resetEditingGroup, removeGroup } from './actions'
import { editingGroupIdSelector } from './selectors'

export function * handleResetEditingGroup ({ prevGroup }) {
  if (prevGroup.zoneIds && prevGroup.zoneIds.length === 0) {
    yield put(removeGroup(prevGroup.groupId))
  }
}

export function * watchForResetEditGroup () {
  yield takeEvery(RESET_EDITING_GROUP, handleResetEditingGroup)
}

export function * watchForZoneSelectionChanges () {
  while (true) {
    yield take([
      SET_ORIGIN_SELECTION_MODE,
      SET_DESTINATION_SELECTION_MODE,
      RESET_SELECTION_MODE
    ])

    const groupId = yield select(editingGroupIdSelector)
    if (groupId) {
      yield put(resetEditingGroup({ prevGroup: { groupId } }))
    }
  }
}
