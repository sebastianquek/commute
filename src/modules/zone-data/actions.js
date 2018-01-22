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

export const requestZoneCompositions = () => ({
  type: t.REQUEST_ZONE_COMPOSITIONS
})

export const receiveZoneCompositions = geojson => ({
  type: t.RECEIVE_ZONE_COMPOSITIONS,
  zones: geojson
})

export const requestZoneCompositionsError = error => ({
  type: t.REQUEST_ZONE_COMPOSITIONS_ERROR,
  error
})

export const requestZoneJourneys = () => ({
  type: t.REQUEST_ZONE_JOURNEYS
})

export const receiveZoneJourneys = (geojson) => ({
  type: t.RECEIVE_ZONE_JOURNEYS,
  journeys: geojson
})

export const requestZoneJourneysError = error => ({
  type: t.REQUEST_ZONE_JOURNEYS_ERROR,
  error
})
