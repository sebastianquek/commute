// import { createSelector } from 'reselect'
import zoneManager from '../zone-manager'

export const brushDomainSelector = state => ({
  x: state.datetimeBrushDomain.x,
  y: state.datetimeBrushDomain.y
})

export const dateDomainSelector = state => state.datetimeBrushDomain.x
export const minDateSelector = state => state.datetimeBrushDomain.minX
export const maxDateSelector = state => state.datetimeBrushDomain.maxX
export const stepSelector = state => state.datetimeBrushDomain.step

export const ridershipDataSelector = state => {
  const zoneIds = zoneManager.selectors.allZoneIdsSelector(state)
  const ridership = zoneIds.reduce((data, key) => {
    data[key] = state.ridershipData[key] || {}
    return data
  }, {})
  return ridership
}
