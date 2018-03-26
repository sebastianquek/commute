import moment from 'moment'
import { select, call, put, take } from 'redux-saga/effects'
import {
  requestAllRidership, fetchingRidership, requestRidershipError, receiveAllRidership,
  forceDatetimeSliderUpdate, setDatetimeZoomDomain, setDataDomain
} from './actions'
import { REQUEST_ALL_RIDERSHIP, SET_STEP, SET_START_DATETIME_BRUSH_DOMAIN } from './actionTypes'
import {
  windowMinDateSelector, windowMaxDateSelector, stepSelector, datetimeBrushDomainSelector,
  datetimeZoomDomainSelector
} from './selectors'
import zoneManager from '../zone-manager'

export function * watchAndReplaceAllRidershipData () {
  while (true) {
    const { zoneId, step } = yield take([
      REQUEST_ALL_RIDERSHIP, SET_STEP
    ])

    const zoneIds = zoneId ? [zoneId] : yield select(zoneManager.selectors.allZoneIdsSelector)
    if (zoneIds.length === 0) continue

    // Get current time window
    const minDate = moment(yield select(windowMinDateSelector))
    const maxDate = moment(yield select(windowMaxDateSelector))
    const duration = moment.duration(maxDate.diff(minDate))
    const interval = step || (yield select(stepSelector))

    // Reset data domain to be the same as window domain
    yield put(setDataDomain([[minDate.toDate(), maxDate.toDate()]]))

    try {
      yield put(fetchingRidership())
      const data = yield call(fetchRidership, zoneIds, minDate, duration, interval)
      const groups = yield select(zoneManager.selectors.allGroupsSelector)
      yield put(receiveAllRidership(groups, data))
      yield put(forceDatetimeSliderUpdate())
    } catch (err) {
      yield put(requestRidershipError(err))
    }
  }
}

export function * watchAndUpdateDatetimeZoom () {
  while (true) {
    yield take(SET_START_DATETIME_BRUSH_DOMAIN)

    // Calculate current zoom duration
    let [ minZoomDate, maxZoomDate ] = yield select(datetimeZoomDomainSelector)
    minZoomDate = moment(minZoomDate)
    maxZoomDate = moment(maxZoomDate)
    const zoomDuration = moment.duration(maxZoomDate.diff(minZoomDate))

    // Calculate new brush duration
    let [ minBrushDate, maxBrushDate ] = yield select(datetimeBrushDomainSelector)
    minBrushDate = moment(minBrushDate)
    maxBrushDate = moment(maxBrushDate)
    const brushDuration = moment.duration(maxBrushDate.diff(minBrushDate))

    // Calculate new zoom domain such that the brush can be seen and the size
    // of the zoom domain is kept consistent
    const durationBetweenZoomAndBrush = moment.duration(zoomDuration.subtract(brushDuration) / 2)
    const newZoomDomain = [
      minBrushDate.clone().subtract(durationBetweenZoomAndBrush).toDate(),
      maxBrushDate.clone().add(durationBetweenZoomAndBrush).toDate()
    ]
    yield put(setDatetimeZoomDomain(newZoomDomain))
  }
}

// Called once on initialisation of the app
export function * getInitialRidership () {
  yield put(requestAllRidership())
}

async function fetchRidership (zoneIds, minDate, duration, step) {
  const query = `/api/v3/ridership?zones=${zoneIds}&startTime=${encodeURIComponent(minDate.format())}&duration=${duration.toISOString()}&step=${step}`
  const res = await fetch(query)
  const data = await res.json()
  return data
}
