import { select, put, take } from 'redux-saga/effects'
import { SET_ORIGIN_SELECTION_MODE, SET_DESTINATION_SELECTION_MODE, RESET_SELECTION_MODE } from './actionTypes'
import { resetEditingGroup, removeGroup } from './actions'
import { emptyGroupsIdSelector } from './selectors'

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
