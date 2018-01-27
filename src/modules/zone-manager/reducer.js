import { combineReducers } from 'redux'
import * as t from './actionTypes'
import c from '../../utils/randomColor'

const zoneSelectionMode = (state = null, action) => {
  switch (action.type) {
    case t.SET_ORIGIN_SELECTION_MODE:
      return 'origins'
    case t.SET_DESTINATION_SELECTION_MODE:
      return 'destinations'
    case t.RESET_SELECTION_MODE:
      return null
    default:
      return state
  }
}

const initialZones = {
  origins: [],
  destinations: []
}
const categorizedZones = (state = initialZones, action) => {
  switch (action.type) {
    case t.ADD_SELECTION:
      if (!state[action.category].map(z => z.id).includes(action.id)) {
        return {
          ...state,
          [action.category]: [...state[action.category], {id: action.id, color: action.color}]
        }
      }
      return state
    case t.REMOVE_SELECTION:
      if (state[action.category].map(z => z.id).includes(action.id)) {
        return {
          ...state,
          [action.category]: state[action.category].filter(z => z.id !== action.id)
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
