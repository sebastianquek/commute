import moment from 'moment'
import { delay } from 'redux-saga'
import { select, call, put, take, takeLatest } from 'redux-saga/effects'
import * as topojson from 'topojson-client'
import get from 'lodash.get'
import {
  REQUEST_ZONE_JOURNEYS, RECEIVE_ZONE_COMPOSITIONS
} from './actionTypes'
import {
  requestZoneJourneys, receiveZoneJourneys, requestZoneJourneysError, removeAllZoneJourneys,
  requestZoneCompositions, receiveZoneCompositions, requestZoneCompositionsError,
  fetchingZoneJourneys, forceRouteChoicesChartUpdate
} from './actions'
import {
  routeChoicesFiltersSelector, zoneCompositionDataSelector,
  hasReceivedZoneCompositions
} from './selectors'
import zoneManager from '../zone-manager'
import datetimeManager from '../datetime-manager'

function * getDataAndFetchZoneJourneys () {
  // Sagas run after reducers, so in this case, the new brush domain will
  // already be updated in the state.
  // https://redux-saga.js.org/docs/api/index.html#selectselector-args

  yield call(delay, 2000) // Debounce the fetching of API calls

  const originZoneIds = yield select(zoneManager.selectors.originZoneIdsSelector)
  const destinationZoneIds = yield select(zoneManager.selectors.destinationZoneIdsSelector)

  // Fetch only if there are origin/destination zones
  if (originZoneIds.length === 0 && destinationZoneIds.length === 0) {
    yield put(removeAllZoneJourneys())
    yield put(forceRouteChoicesChartUpdate())
    return
  }

  // Get current brushed time window
  const dateDomain = yield select(datetimeManager.selectors.datetimeBrushDomainSelector)
  const startTime = moment(dateDomain[0])
  const duration = moment.duration(moment(dateDomain[1]).diff(startTime))

  // Get filters
  const { duration: routeDuration, numCommuters, includeMrt, includeBus } = yield select(routeChoicesFiltersSelector)
  const minCommuters = numCommuters[0]
  const minRouteDuration = routeDuration[0]

  try {
    yield put(fetchingZoneJourneys())
    const journeys = yield call(
      fetchZoneJourneys, originZoneIds, destinationZoneIds, startTime, duration,
      minCommuters, minRouteDuration, includeMrt, includeBus
    )

    if (!(yield select(hasReceivedZoneCompositions))) {
      yield take(RECEIVE_ZONE_COMPOSITIONS)
    }

    const zoneData = yield select(zoneCompositionDataSelector)
    journeys.features.forEach(f => {
      f.properties.originZoneData = get(zoneData, f.properties.originZone, null)
      f.properties.destinationZoneData = get(zoneData, f.properties.destinationZone, null)
    })

    yield put(receiveZoneJourneys(journeys, originZoneIds, destinationZoneIds))
    yield put(forceRouteChoicesChartUpdate())
  } catch (err) {
    yield put(requestZoneJourneysError(err))
  }
}

export function * watchAndUpdateZoneJourneys () {
  yield takeLatest([
    REQUEST_ZONE_JOURNEYS,
    zoneManager.actionTypes.ADD_ZONE_TO_GROUP,
    zoneManager.actionTypes.REMOVE_ZONE_FROM_GROUP,
    zoneManager.actionTypes.REMOVE_GROUP,
    zoneManager.actionTypes.SWAP_OD,
    datetimeManager.actionTypes.SET_DATETIME_BRUSH_DOMAIN
  ], getDataAndFetchZoneJourneys)
}

// Called once on initialisation of the app
export function * getInitialZoneJourneys () {
  yield put(requestZoneJourneys())
}

async function fetchZoneJourneys (
  originZoneIds, destinationZoneIds, startTime, duration,
  minCommuters, minRouteDuration, includeMrt, includeBus
) {
  let query = `/api/v3/journeys?startTime=${encodeURIComponent(startTime.format())}&duration=${duration.toISOString()}`
  if (originZoneIds.length > 0) query += `&origins=${originZoneIds}`
  if (destinationZoneIds.length > 0) query += `&destinations=${destinationZoneIds}`
  // Add filters
  query += `&minCommuters=${minCommuters}&minRouteDuration=${minRouteDuration}`
  if (includeMrt) query += '&includeMrt'
  if (includeBus) query += '&includeBus'
  const res = await fetch(query)
  const resJson = await res.json()
  return resJson
}

async function fetchZoneCompositions () {
  const res = await fetch('/api/v3/zones')
  const topojsonZones = await res.json()
  return topojson.feature(topojsonZones, topojsonZones.objects.zones)
}

// Called once on initialisation of the app
export function * getZoneCompositions () {
  try {
    yield put(requestZoneCompositions())
    const zones = yield call(fetchZoneCompositions)
    yield put(receiveZoneCompositions(zones))
  } catch (err) {
    yield put(requestZoneCompositionsError(err))
  }
}
