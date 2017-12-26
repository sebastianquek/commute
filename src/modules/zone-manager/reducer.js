import { combineReducers } from 'redux'
import * as t from './actionTypes'

const zoneSelectionMode = (state = 'origin', action) => {
  switch (action.type) {
    case t.SET_ORIGIN_SELECTION_MODE:
      return 'origin'
    case t.SET_DESTINATION_SELECTION_MODE:
      return 'destination'
    case t.RESET_SELECTION_MODE:
      return null
    default:
      return state
  }
}

const categorizedZones = (state = {
  origins: [1, 2],
  destinations: [4, 5]
}, action) => {
  switch (action.type) {
    case t.ADD_SELECTION:
      if (!state[action.category].includes(action.id)) {
        return {
          ...state,
          [action.category]: [...state[action.category], action.id]
        }
      }
      return state
    case t.REMOVE_SELECTION:
      if (state[action.category].includes(action.id)) {
        return {
          ...state,
          [action.category]: state[action.category].filter(z => z !== action.id)
        }
      }
      return state
    default:
      return state
  }
}

export default combineReducers({
  zoneSelectionMode,
  categorizedZones
})
