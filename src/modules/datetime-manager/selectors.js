import { createSelector } from 'reselect'
import zoneManager from '../zone-manager'

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

export const ridershipDataSelector = createSelector(
  state => zoneManager.selectors.allZoneIdsSelector(state),
  state => state.ridershipData,
  (zoneIds, ridershipData) => zoneIds.reduce((data, key) => {
    data[key] = ridershipData[key] || {}
    return data
  }, {})
)
