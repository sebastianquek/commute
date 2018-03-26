import moment from 'moment'

export const minDateSelector = state => state.ridershipDomain.windowDomain[0]
export const maxDateSelector = state => state.ridershipDomain.windowDomain[1]
export const stepSelector = state => state.ridershipDomain.step

export const datetimeBrushDomainSelector = state => state.datetimeBrushDomain
export const datetimeZoomDomainSelector = state => state.datetimeZoomDomain

export const ridershipDataSelector = state => ({
  departureData: Object.entries(state.ridershipData.departureData)
    .map(([date, step]) => ({...step, date: moment(date)})),
  arrivalData: Object.entries(state.ridershipData.arrivalData)
    .map(([date, step]) => ({...step, date: moment(date)}))
})

export const shouldDatetimeSliderUpdate = state =>
  state.datetimeManagerInterfaceFlags.shouldDatetimeSliderUpdate

export const isFetchingRidershipData = state =>
  state.datetimeManagerInterfaceFlags.isFetchingRidershipData
