import { all, put, take } from 'redux-saga/effects'
import zoneData from '../zone-data'
import { MAP_HAS_LOADED } from './actionTypes'
import { addZoneCompositions } from './actions'

export function * displayZoneCompositions () {
  const [{ zones }] = yield all([
    take(zoneData.actionTypes.RECEIVE_ZONE_COMPOSITIONS),
    take(MAP_HAS_LOADED)
  ])
  yield put(addZoneCompositions(zones))
}
