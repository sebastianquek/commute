import * as t from './actionTypes'

export const filterNumCommuters = domain => ({
  type: t.FILTER_NUM_COMMUTERS,
  domain
})

export const filterDuration = domain => ({
  type: t.FILTER_DURATION,
  domain
})

export const filterModesOfTransport = (mrt, bus) => ({
  type: t.FILTER_MODES_OF_TRANSPORT,
  mrt,
  bus
})

export const setFilteredRouteIds = filteredRouteIds => ({
  type: t.SET_FILTERED_ROUTE_IDS,
  filteredRouteIds
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
