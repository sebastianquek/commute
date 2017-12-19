import * as t from './actionTypes'

export const filterNumCommuters = (id, min, max) => ({
  type: t.FILTER_NUM_COMMUTERS,
  id,
  min,
  max
})

export const hoverRouteChoice = (zoneId, routeId) => ({
  type: t.HOVER_ROUTE_CHOICE,
  id: zoneId,
  routeId
})
