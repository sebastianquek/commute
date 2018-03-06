import * as t from './actionTypes'
import { maxDateSelector } from './selectors'

export const setDatetimeBrushDomain = domain => ({
  type: t.SET_DATETIME_BRUSH_DOMAIN,
  domain
})

export const setStartDatetime = datetime => {
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

export const setStep = step => ({
  type: t.SET_STEP,
  step
})

export const requestRidership = () => ({
  type: t.REQUEST_RIDERSHIP
})

export const fetchingRidership = () => ({
  type: t.FETCHING_RIDERSHIP
})

export const requestRidershipError = error => ({
  type: t.REQUEST_RIDERSHIP_ERROR,
  error
})

export const receiveRidership = (clearExistingRidershipData, groups, data) => ({
  type: t.RECEIVE_RIDERSHIP,
  clearExistingRidershipData,
  groups,
  data
})

export const forceDatetimeSliderUpdate = () => ({
  type: t.FORCE_DATETIME_SLIDER_UPDATE
})

export const resetForceDatetimeSliderUpdate = () => ({
  type: t.RESET_FORCE_DATETIME_SLIDER_UPDATE
})
