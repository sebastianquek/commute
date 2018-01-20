import * as t from './actionTypes'
import datetimeManager from '../datetime-manager'
import { fetchZoneJourneys } from '../zone-data/actions'

export const addSelection = (id, color, category) => {
  return async (dispatch) => {
    dispatch({
      type: t.ADD_SELECTION,
      id,
      color,
      category
    })
    // TODO: Remove these dependencies
    dispatch(datetimeManager.actions.fetchRidership(id))
    dispatch(fetchZoneJourneys(id, category))
  }
}

export const removeSelection = (id, category) => ({
  type: t.REMOVE_SELECTION,
  id,
  category
})

export const resetSelectionMode = () => ({
  type: t.RESET_SELECTION_MODE
})

export const setOriginSelectionMode = () => ({
  type: t.SET_ORIGIN_SELECTION_MODE
})

export const setDestinationSelectionMode = () => ({
  type: t.SET_DESTINATION_SELECTION_MODE
})
