import moment from 'moment'
import { select, call, put, take } from 'redux-saga/effects'
import { requestRidership, fetchingRidership, requestRidershipError, receiveRidership, forceDatetimeSliderUpdate, setDatetimeZoomDomain } from './actions'
import { REQUEST_RIDERSHIP, SET_STEP, SET_START_DATETIME_BRUSH_DOMAIN } from './actionTypes'
import { minDateSelector, maxDateSelector, stepSelector, zoomedDateDomainSelector, brushedDateDomainSelector } from './selectors'
import zoneManager from '../zone-manager'

export function * watchAndUpdateRidership () {
  while (true) {
    const { zoneId, step } = yield take([REQUEST_RIDERSHIP, SET_STEP, zoneManager.actionTypes.ADD_ZONE_TO_GROUP])

    const zoneIds = zoneId ? [zoneId] : yield select(zoneManager.selectors.allZoneIdsSelector)
    if (zoneIds.length === 0) continue

    const clearExistingRidershipData = step !== undefined

    // Get current time window
    const minDate = moment(yield select(minDateSelector))
    const maxDate = moment(yield select(maxDateSelector))
    const duration = moment.duration(maxDate.diff(minDate))
    const interval = step || (yield select(stepSelector))

    try {
      yield put(fetchingRidership())
      const journeys = yield call(fetchRidership, zoneIds, minDate, duration, interval)
      const groups = yield select(zoneManager.selectors.allGroupsSelector)
      yield put(receiveRidership(clearExistingRidershipData, groups, journeys))
      yield put(forceDatetimeSliderUpdate())
    } catch (err) {
      yield put(requestRidershipError(err))
    }
  }
}

export function * watchAndUpdateDatetimeZoom () {
  while (true) {
    yield take(SET_START_DATETIME_BRUSH_DOMAIN)
    let [ minZoomDate, maxZoomDate ] = yield select(zoomedDateDomainSelector)
    minZoomDate = moment(minZoomDate)
    maxZoomDate = moment(maxZoomDate)
    const zoomDuration = moment.duration(maxZoomDate.diff(minZoomDate))

    let [ minBrushDate, maxBrushDate ] = yield select(brushedDateDomainSelector)
    minBrushDate = moment(minBrushDate)
    maxBrushDate = moment(maxBrushDate)
    const brushDuration = moment.duration(maxBrushDate.diff(minBrushDate))

    const durationBetweenZoomAndBrush = moment.duration(zoomDuration.subtract(brushDuration) / 2)
    const newZoomDomain = {
      x: [
        minBrushDate.clone().subtract(durationBetweenZoomAndBrush).toDate(),
        maxBrushDate.clone().add(durationBetweenZoomAndBrush).toDate()
      ]
    }
    yield put(setDatetimeZoomDomain(newZoomDomain))
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
