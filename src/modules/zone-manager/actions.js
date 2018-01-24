import * as t from './actionTypes'

export const addSelection = (id, color, category) => ({
  type: t.ADD_SELECTION,
  id,
  color,
  category
})

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
