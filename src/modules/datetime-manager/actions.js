import moment from 'moment'
import * as t from './actionTypes'
import zoneManager from '../zone-manager'
import { minDateSelector, maxDateSelector, stepSelector } from './selectors'

export const setDatetimeBrushDomain = domain => ({
  type: t.SET_DATETIME_BRUSH_DOMAIN,
  domain
})

export const setFirstDatetime = datetime => {
  return async (dispatch, getState) => {
    dispatch({
      type: t.SET_START_DATETIME_BRUSH_DOMAIN,
      startDatetime: datetime,
      maxDate: maxDateSelector(getState())
    })
  }
}

export const setDatetimeZoomDomain = domain => ({
  type: t.SET_DATETIME_ZOOM_DOMAIN,
  domain
})

export const setStep = step => {
  return async (dispatch, getState) => {
    dispatch({
      type: t.SET_STEP,
      step
    })
    dispatch(fetchRidership())
  }
}

const requestRidership = () => ({
  type: t.REQUEST_RIDERSHIP
})

const receiveRidership = data => ({
  type: t.RECEIVE_RIDERSHIP,
  data
})

export function fetchRidership (zoneIds) {
  return async (dispatch, getState) => {
    const state = getState()
    zoneIds = zoneIds || zoneManager.selectors.allZoneIdsSelector(state)
    const minDate = moment(minDateSelector(state))
    const maxDate = moment(maxDateSelector(state))
    const duration = moment.duration(maxDate.diff(minDate))
    const step = stepSelector(state)
    dispatch(requestRidership())
    const query = `http://localhost:1337/api/v2/ridership?zones=${zoneIds}&startTime=${encodeURIComponent(minDate.format())}&duration=${duration.toISOString()}&step=${step}`
    const res = await fetch(query)
    const data = await res.json()
    // console.log(JSON.stringify(data, null, 2))
    dispatch(receiveRidership(data))
  }
}
