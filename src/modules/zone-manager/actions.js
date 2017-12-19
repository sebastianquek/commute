import * as t from './actionTypes'

export const add = (id, category) => ({
  type: t.ADD,
  id,
  category
})

export const remove = (id, category) => ({
  type: t.REMOVE,
  id,
  category
})

export const setOriginSelectionMode = () => ({
  type: t.SET_ORIGIN_SELECTION_MODE
})

export const setDestinationSelectionMode = () => ({
  type: t.SET_DESTINATION_SELECTION_MODE
})
