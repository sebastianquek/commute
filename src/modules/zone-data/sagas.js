import { call, put } from 'redux-saga/effects'
import * as topojson from 'topojson-client'
import {
  requestZoneCompositions, receiveZoneCompositions, requestZoneCompositionsError
} from './actions'

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
