import { createSelector } from 'reselect'

export const brushDomainSelector = createSelector(
  state => state.datetimeBrushDomain.x,
  state => state.datetimeBrushDomain.y,
  (x, y) => ({x, y})
)

export const zoomDomainSelector = createSelector(
  state => state.datetimeZoomDomain.x,
  state => state.datetimeZoomDomain.y,
  (x, y) => ({x, y})
)

export const minDateSelector = state => state.ridershipDomain.minX
export const maxDateSelector = state => state.ridershipDomain.maxX
export const stepSelector = state => state.ridershipDomain.step

export const brushedDateDomainSelector = state => state.datetimeBrushDomain.x
export const zoomedDateDomainSelector = state => state.datetimeZoomDomain.x

export const ridershipDataSelector = state => state.ridershipData

export const shouldDatetimeSliderUpdate = state =>
  state.datetimeManagerInterfaceFlags.shouldDatetimeSliderUpdate

export const isFetchingRidershipData = state =>
  state.datetimeManagerInterfaceFlags.isFetchingRidershipData
