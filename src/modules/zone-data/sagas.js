import moment from 'moment'
import { delay } from 'redux-saga'
import { select, call, put, take, takeLatest, cancelled } from 'redux-saga/effects'
import * as topojson from 'topojson-client'
import { REQUEST_ZONE_JOURNEYS } from './actionTypes'
import {
  requestZoneJourneys, receiveZoneJourneys, requestZoneJourneysError, removeAllZoneJourneys,
  requestZoneCompositions, receiveZoneCompositions, requestZoneCompositionsError,
  fetchingZoneJourneys, forceRouteChoicesChartUpdate
} from './actions'
import zoneManager from '../zone-manager'
import datetimeManager from '../datetime-manager'

export function * getDataAndFetchZoneJourneys () {
  // Sagas run after reducers, so in this case, the new brush domain will
  // already be updated in the state.
  // https://redux-saga.js.org/docs/api/index.html#selectselector-args

  yield call(delay, 1000) // Debounce the fetching of API calls

  // Get current brushed time window
  const dateDomain = yield select(datetimeManager.selectors.brushedDateDomainSelector)
  const startTime = moment(dateDomain[0])
  const duration = moment.duration(moment(dateDomain[1]).diff(startTime))

  let originZoneIds = yield select(zoneManager.selectors.originZoneIdsSelector)
  let destinationZoneIds = yield select(zoneManager.selectors.destinationZoneIdsSelector)

  if (originZoneIds.length === 0 && destinationZoneIds.length === 0) {
    yield put(removeAllZoneJourneys())
    return
  }

  try {
    yield put(fetchingZoneJourneys())
    const journeys = yield call(fetchZoneJourneys, originZoneIds, destinationZoneIds, startTime, duration)
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
    datetimeManager.actionTypes.SET_DATETIME_BRUSH_DOMAIN
  ], getDataAndFetchZoneJourneys)
}

// Called once on initialisation of the app
export function * getInitialZoneJourneys () {
  yield put(requestZoneJourneys())
}

async function fetchZoneJourneys (originZoneIds, destinationZoneIds, startTime, duration) {
  let query = `/api/v3/journeys?startTime=${encodeURIComponent(startTime.format())}&duration=${duration.toISOString()}`
  if (originZoneIds.length > 0) query += `&origins=${originZoneIds}`
  if (destinationZoneIds.length > 0) query += `&destinations=${destinationZoneIds}`
  const res = await fetch(query)
  const resJson = await res.json()
  return resJson
}

async function fetchZoneCompositions () {
  const res = await fetch('/api/v3/zones')
  const resJson = await res.json()
  const data = topojson.feature(resJson, resJson.objects.zones)
  return data
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
