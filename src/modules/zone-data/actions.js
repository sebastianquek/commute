import moment from 'moment'
import * as topojson from 'topojson-client'
import * as t from './actionTypes'
import zoneManager from '../zone-manager'
import datetimeManager from '../datetime-manager'

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

const requestZoneCompositions = () => ({
  type: t.REQUEST_ZONE_COMPOSITIONS
})

const receiveZoneCompositions = geojson => ({
  type: t.RECEIVE_ZONE_COMPOSITIONS,
  zones: geojson
})

export function fetchZones () {
  return async dispatch => {
    dispatch(requestZoneCompositions())
    const res = await fetch('http://localhost:1337/api/v2/zones')
    const resJson = await res.json()
    const data = topojson.feature(resJson, resJson.objects.zones)
    dispatch(receiveZoneCompositions(data))
  }
}

const requestZoneJourneys = () => ({
  type: t.REQUEST_ZONE_JOURNEYS
})

const receiveZoneJourneys = (geojson) => ({
  type: t.RECEIVE_ZONE_JOURNEYS,
  journeys: geojson
})

export function fetchZoneJourneys (zoneId, category) {
  return async (dispatch, getState) => {
    dispatch(requestZoneJourneys())
    const state = getState()
    let originZoneIds = []
    let destinationZoneIds = []
    if (zoneId && category) {
      if (category === 'origins') {
        originZoneIds.push(zoneId)
      } else if (category === 'destinations') {
        destinationZoneIds.push(zoneId)
      }
    } else {
      originZoneIds = zoneManager.selectors.originZoneIdsSelector(state)
      destinationZoneIds = zoneManager.selectors.destinationsZoneIdsSelector(state)
    }
    const dateDomain = datetimeManager.selectors.brushedDateDomainSelector(state)
    const startTime = moment(dateDomain[0])
    const duration = moment.duration(moment(dateDomain[1]).diff(startTime))
    const query = `http://localhost:1337/api/v2/journeys?origins=${originZoneIds}&destinations=${destinationZoneIds}&startTime=${encodeURIComponent(startTime.format())}&duration=${duration.toISOString()}`
    const res = await fetch(query)
    const resJson = await res.json()
    dispatch(receiveZoneJourneys(resJson))
  }
}
