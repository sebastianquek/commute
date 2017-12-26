import { combineReducers } from 'redux'
import * as t from './actionTypes'
import map from '../map'

const zoneSelectionMode = (state = null, action) => {
  switch (action.type) {
    case t.SET_ORIGIN_SELECTION_MODE:
      return 'origin'
    case t.SET_DESTINATION_SELECTION_MODE:
      return 'destination'
    default:
      return null
  }
}

const categorizedZones = (state = {
  origins: [1, 2],
  destinations: [4, 5]
}, action) => {
  switch (action.type) {
    case t.ADD:
      if (!state[action.category].includes(action.id)) {
        return {
          ...state,
          [action.category]: [...state[action.category], action.id]
        }
      }
      return state
    case t.REMOVE:
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

const currentZone = (state = {
  zoneId: null,
  isSelected: false
}, action) => {
  switch (action.type) {
    case map.actionTypes.HOVER_OVER_ZONE:
      return {...state, zoneId: action.zoneId}
    default:
      return state
  }
}

export default combineReducers({
  zoneSelectionMode,
  currentZone,
  categorizedZones
})
