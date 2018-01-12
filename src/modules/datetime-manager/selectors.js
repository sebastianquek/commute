import { createSelector } from 'reselect'
import zoneManager from '../zone-manager'

export const brushDomainSelector = createSelector(
  state => state.datetimeBrushDomain.x,
  state => state.datetimeBrushDomain.y,
  (x, y) => ({x, y})
)

export const dateDomainSelector = state => state.datetimeBrushDomain.x
export const minDateSelector = state => state.datetimeBrushDomain.minX
export const maxDateSelector = state => state.datetimeBrushDomain.maxX
export const stepSelector = state => state.datetimeBrushDomain.step

export const ridershipDataSelector = createSelector(
  state => zoneManager.selectors.allZoneIdsSelector(state),
  state => state.ridershipData,
  (zoneIds, ridershipData) => zoneIds.reduce((data, key) => {
    data[key] = ridershipData[key] || {}
    return data
  }, {})
)
