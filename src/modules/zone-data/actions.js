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

export const fetchingZoneJourneys = () => ({
  type: t.FETCHING_ZONE_JOURNEYS
})

export const receiveZoneJourneys = (geojson, originZoneIds, destinationZoneIds) => ({
  type: t.RECEIVE_ZONE_JOURNEYS,
  journeys: geojson,
  originZoneIds,
  destinationZoneIds
})

export const requestZoneJourneysError = error => ({
  type: t.REQUEST_ZONE_JOURNEYS_ERROR,
  error
})

export const removeAllZoneJourneys = () => ({
  type: t.REMOVE_ZONE_JOURNEYS
})

export const forceRouteChoicesChartUpdate = () => ({
  type: t.FORCE_ROUTE_CHOICES_CHART_UPDATE
})

export const resetForceRouteChoicesChartUpdate = () => ({
  type: t.RESET_FORCE_ROUTE_CHOICES_CHART_UPDATE
})
