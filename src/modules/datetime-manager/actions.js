import * as t from './actionTypes'
import { absoluteMaxDateSelector } from './selectors'

export const setDatetimeBrushDomain = domain => ({
  type: t.SET_DATETIME_BRUSH_DOMAIN,
  domain
})

export const setStartDatetime = datetime => {
  return async (dispatch, getState) => {
    dispatch({
      type: t.SET_START_DATETIME_BRUSH_DOMAIN,
      startDatetime: datetime,
      maxDate: absoluteMaxDateSelector(getState())
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

export const setWindowDomain = domain => ({
  type: t.SET_WINDOW_DOMAIN,
  domain
})

export const setDataDomain = domain => ({
  type: t.SET_DATA_DOMAIN,
  domain
})

export const fetchingRidership = () => ({
  type: t.FETCHING_RIDERSHIP
})

export const requestRidershipError = error => ({
  type: t.REQUEST_RIDERSHIP_ERROR,
  error
})

export const requestAllRidership = () => ({
  type: t.REQUEST_ALL_RIDERSHIP
})

export const receiveAllRidership = (groups, data) => ({
  type: t.RECEIVE_ALL_RIDERSHIP,
  groups,
  data
})

export const requestZoneRidership = zoneIds => ({
  type: t.REQUEST_ZONE_RIDERSHIP,
  zoneIds
})

export const receiveZoneRidership = (zoneIds, zoneIdToGroupIdMap, data) => ({
  type: t.RECEIVE_ZONE_RIDERSHIP,
  zoneIds,
  zoneIdToGroupIdMap,
  data
})

export const forceDatetimeSliderUpdate = () => ({
  type: t.FORCE_DATETIME_SLIDER_UPDATE
})

export const resetForceDatetimeSliderUpdate = () => ({
  type: t.RESET_FORCE_DATETIME_SLIDER_UPDATE
})

export const setAbsoluteRidership = () => ({
  type: t.SET_ABSOLUTE_RIDERSHIP
})

export const setRelativeRidership = () => ({
  type: t.SET_RELATIVE_RIDERSHIP
})
