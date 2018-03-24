import * as t from './actionTypes'

export const hoveredRouteId = (state, action) => {
  switch (action.type) {
    case t.SET_HOVERED_ROUTE_ID:
      return action.routeId
    case t.CLEAR_HOVERED_ROUTE_ID:
    default:
      return -1
  }
}
