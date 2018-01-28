import { combineReducers } from 'redux'
import * as t from './actionTypes'
import c from '../../utils/randomColor'

const zoneSelectionMode = (state = null, action) => {
  switch (action.type) {
    case t.SET_ORIGIN_SELECTION_MODE:
      return 'origins'
    case t.SET_DESTINATION_SELECTION_MODE:
      return 'destinations'
    case t.SET_EDIT_SELECTION_MODE:
      return 'edit'
    case t.RESET_SELECTION_MODE:
      return null
    default:
      return state
  }
}

const editingGroupId = (state = null, action) => {
  switch (action.type) {
    case t.SET_EDITING_GROUP:
      return action.groupId
    case t.RESET_EDITING_GROUP:
      return null
    default:
      return state
  }
}

const initialZones = {
  origins: [{groupId: 1, color: c.next().value, zoneIds: [1, 2]}, {groupId: 2, color: c.next().value, zoneIds: [3, 4, 5]}],
  destinations: []
}
const categorizedZones = (state = initialZones, action) => {
  switch (action.type) {
    case t.ADD_GROUP:
      return {
        ...state,
        [action.category]: [
          ...state[action.category],
          {
            groupId: action.groupId,
            color: action.color,
            zoneIds: []
          }
        ]
      }

    case t.ADD_ZONE_TO_GROUP:
      for (let category of Object.keys(state)) {
        const groups = [...state[category]]
        const groupIdx = groups.map(g => g.groupId).indexOf(action.groupId)
        if (groupIdx !== -1) {
          groups[groupIdx].zoneIds.push(action.zoneId)
          return {
            ...state,
            [category]: groups
          }
        }
      }
      return state

    case t.REMOVE_GROUP:
      for (let category of Object.keys(state)) {
        const groups = [...state[category]]
        const groupIdx = groups.map(g => g.groupId).indexOf(action.groupId)
        if (groupIdx !== -1) {
          groups.splice(groupIdx, 1)
          return {
            ...state,
            [category]: groups
          }
        }
      }
      return state

    case t.REMOVE_ZONE_FROM_GROUP:
      for (let category of Object.keys(state)) {
        const groups = [...state[category]]
        const groupIdx = groups.map(g => g.groupId).indexOf(action.groupId)
        if (groupIdx !== -1) {
          groups[groupIdx].zoneIds.splice(groups[groupIdx].zoneIds.indexOf(action.zoneId), 1)
          return {
            ...state,
            [category]: groups
          }
        }
      }
      return state

    default:
      return state
  }
}

export default combineReducers({
  zoneSelectionMode,
  editingGroupId,
  categorizedZones
})
