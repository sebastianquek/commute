import moment from 'moment'
import { select, call, put, take } from 'redux-saga/effects'
import { requestRidership, requestRidershipError, receiveRidership } from './actions'
import { REQUEST_RIDERSHIP, SET_STEP } from './actionTypes'
import { minDateSelector, maxDateSelector, stepSelector } from './selectors'
import zoneManager from '../zone-manager'

export function * watchAndUpdateRidership () {
  while (true) {
    const { zoneId, step } = yield take([REQUEST_RIDERSHIP, SET_STEP, zoneManager.actionTypes.ADD_ZONE_TO_GROUP])

    const zoneIds = zoneId ? [zoneId] : yield select(zoneManager.selectors.allZoneIdsSelector)
    if (zoneIds.length === 0) continue

    // Get current time window
    const minDate = moment(yield select(minDateSelector))
    const maxDate = moment(yield select(maxDateSelector))
    const duration = moment.duration(maxDate.diff(minDate))
    const interval = step || (yield select(stepSelector))

    try {
      const journeys = yield call(fetchRidership, zoneIds, minDate, duration, interval)
      const groups = yield select(zoneManager.selectors.allGroupsSelector)
      yield put(receiveRidership(groups, journeys))
    } catch (err) {
      yield put(requestRidershipError(err))
    }
  }
}

// Called once on initialisation of the app
export function * getInitialRidership () {
  yield put(requestRidership())
}

async function fetchRidership (zoneIds, minDate, duration, step) {
  const query = `/api/v3/ridership?zones=${zoneIds}&startTime=${encodeURIComponent(minDate.format())}&duration=${duration.toISOString()}&step=${step}`
  const res = await fetch(query)
  const data = await res.json()
  return data
}
