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
  zoneManager.selectors.allGroupsSelector,
  state => state.ridershipData,
  (groups, ridershipData) => {
    return groups.reduce((data, g) => {
      // For each group, aggregate ridership data of its zones
      data[g.groupId] = g.zoneIds.reduce((summedData, id) => {
        const zoneRidershipData = ridershipData[id] || {}
        Object.keys(zoneRidershipData).forEach(date => {
          const counts = zoneRidershipData[date]
          if (!summedData.hasOwnProperty(date)) {
            // Create a new empty entry if no previous entry
            summedData[date] = {departure: 0, arrival: 0}
          }
          summedData[date] = {
            departure: summedData[date].departure + (counts.departure || 0),
            arrival: summedData[date].arrival + (counts.arrival || 0)
          }
        })
        return summedData
      }, {})
      return data
    }, {})
  }
)

export const maxRidershipRangeSelector = createSelector(
  ridershipDataSelector,
  ridershipData => {
    const dataSortedByDatetime = Object.keys(ridershipData).reduce((dataSortedByDatetime, key) => {
      Object.keys(ridershipData[key]).forEach(datetime => {
        if (!dataSortedByDatetime.hasOwnProperty(datetime)) {
          dataSortedByDatetime[datetime] = [0, 0]
        }
        dataSortedByDatetime[datetime] = [
          dataSortedByDatetime[datetime][0] + (ridershipData[key][datetime]['arrival'] || 0),
          dataSortedByDatetime[datetime][1] + (ridershipData[key][datetime]['departure'] || 0)
        ]
      })
      return dataSortedByDatetime
    }, {})
    return Math.max(1, Object.keys(dataSortedByDatetime).reduce((maxVal, key) => Math.max(maxVal, ...dataSortedByDatetime[key]), 0))
  }
)
