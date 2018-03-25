import { select, put, take } from 'redux-saga/effects'
import { SET_ORIGIN_SELECTION_MODE, SET_DESTINATION_SELECTION_MODE, RESET_SELECTION_MODE, REMOVE_GROUP } from './actionTypes'
import { resetEditingGroup, removeGroup, resetSelectionMode } from './actions'
import { emptyGroupsIdSelector, editingGroupIdSelector } from './selectors'

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
