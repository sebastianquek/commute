import moment from 'moment'
import { select, call, put, take } from 'redux-saga/effects'
import * as topojson from 'topojson-client'
import { REQUEST_ZONE_JOURNEYS } from './actionTypes'
import {
  requestZoneJourneys, receiveZoneJourneys, requestZoneJourneysError,
  requestZoneCompositions, receiveZoneCompositions, requestZoneCompositionsError
} from './actions'
import zoneManager from '../zone-manager'
import datetimeManager from '../datetime-manager'

export function * watchAndUpdateZoneJourneys () {
  while (true) {
    // Sagas run after reducers, so in this case, the new brush domain will
    // already be updated in the state.
    // https://redux-saga.js.org/docs/api/index.html#selectselector-args
    const { id, category } = yield take([
      REQUEST_ZONE_JOURNEYS,
      zoneManager.actionTypes.ADD_SELECTION,
      datetimeManager.actionTypes.SET_DATETIME_BRUSH_DOMAIN
    ])

    let originZoneIds = []
    let destinationZoneIds = []

    // Get current brushed time window
    const dateDomain = yield select(datetimeManager.selectors.brushedDateDomainSelector)
    const startTime = moment(dateDomain[0])
    const duration = moment.duration(moment(dateDomain[1]).diff(startTime))

    if (id && category) { // Get specific zone's journeys
      if (category === 'origins') originZoneIds.push(id)
      else if (category === 'destinations') destinationZoneIds.push(id)
    } else { // Get journeys for all currently selected zones
      originZoneIds = yield select(zoneManager.selectors.originZoneIdsSelector)
      destinationZoneIds = yield select(zoneManager.selectors.destinationsZoneIdsSelector)
    }

    try {
      const journeys = yield call(fetchZoneJourneys, originZoneIds, destinationZoneIds, startTime, duration)
      yield put(receiveZoneJourneys(journeys))
    } catch (err) {
      yield put(requestZoneJourneysError(err))
    }
  }
}

// Called once on initialisation of the app
export function * getInitialZoneJourneys () {
  yield put(requestZoneJourneys())
}

async function fetchZoneJourneys (originZoneIds, destinationZoneIds, startTime, duration) {
  const query = `http://localhost:1337/api/v2/journeys?origins=${originZoneIds}&destinations=${destinationZoneIds}&startTime=${encodeURIComponent(startTime.format())}&duration=${duration.toISOString()}`
  const res = await fetch(query)
  const resJson = await res.json()
  return resJson
}

async function fetchZoneCompositions () {
  const res = await fetch('http://localhost:1337/api/v2/zones')
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
