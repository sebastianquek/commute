import * as t from './actionTypes'

export const setHoveredRouteId = routeId => ({
  type: t.SET_HOVERED_ROUTE_ID,
  routeId
})

export const clearHoveredRouteId = () => ({
  type: t.CLEAR_HOVERED_ROUTE_ID
})
