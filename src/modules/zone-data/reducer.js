import { combineReducers } from 'redux'
import * as t from './actionTypes'

const zoneDataFilters = (state = {}, action) => {
  switch (action.type) {
    case t.FILTER_NUM_COMMUTERS:
      let newZoneDataFilter
      if (state.hasOwnProperty(action.id)) {
        newZoneDataFilter = {
          ...state[action.id],
          numCommuters: {min: action.min, max: action.max}
        }
      } else {
        newZoneDataFilter = {
          numCommuters: {min: action.min, max: action.max}
        }
      }

      return {
        ...state,
        [action.id]: newZoneDataFilter
      }
    default:
      return state
  }
}

export default combineReducers({
  zoneDataFilters
})
