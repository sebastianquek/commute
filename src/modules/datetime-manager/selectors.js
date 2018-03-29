import { createSelector } from 'reselect'
import moment from 'moment'
import { scaleLinear } from 'd3'
import cloneDeep from 'lodash.clonedeep'

export const absoluteMinDateSelector = state => state.ridershipDomain.absoluteDomain[0]
export const absoluteMaxDateSelector = state => state.ridershipDomain.absoluteDomain[1]
export const dataDomainsSelector = state => state.ridershipDomain.dataDomain
export const windowMinDateSelector = state => state.ridershipDomain.windowDomain[0]
export const windowMaxDateSelector = state => state.ridershipDomain.windowDomain[1]
export const stepSelector = state => state.ridershipDomain.step

export const datetimeBrushDomainSelector = state => state.datetimeBrushDomain
export const datetimeZoomDomainSelector = state => state.datetimeZoomDomain

export const shouldDatetimeSliderUpdate = state =>
  state.datetimeManagerInterfaceFlags.shouldDatetimeSliderUpdate

export const isFetchingRidershipData = state =>
  state.datetimeManagerInterfaceFlags.isFetchingRidershipData

export const showAbsoluteRidershipSelector = state =>
  state.datetimeManagerInterfaceFlags.showAbsoluteRidership

export const ridershipDataSelector = createSelector(
  [(state) => state.ridershipData, showAbsoluteRidershipSelector],
  (ridershipData, showAbsoluteRidership) => {
    const departureData = Object.entries(ridershipData.departureData)
      .map(([date, step]) => ({...cloneDeep(step), date: moment(date)}))
    const arrivalData = Object.entries(ridershipData.arrivalData)
      .map(([date, step]) => ({...cloneDeep(step), date: moment(date)}))

    if (!showAbsoluteRidership) {
      const maxDepartureSumsPerDayPerGroup = getSumsPerDayPerGroup(departureData)
      const maxArrivalSumsPerGroupPerDay = getSumsPerDayPerGroup(arrivalData)

      updateSums(maxDepartureSumsPerDayPerGroup, departureData)
      updateSums(maxArrivalSumsPerGroupPerDay, arrivalData)
    }
    return { departureData, arrivalData }
  }
)

function getDate (d) {
  return moment(d).set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
}

function isSameDate (a, b) {
  return getDate(a).isSame(getDate(b))
}

function getSumsPerDayPerGroup (data) {
  const maxSumsPerDayPerGroup = {}
  let currentDate
  for (let i = 0; i < data.length; i++) {
    let { date, ...groups } = data[i]
    if (!currentDate || !isSameDate(currentDate, date)) {
      currentDate = date
      maxSumsPerDayPerGroup[getDate(date)] = Object.entries(groups)
        .reduce((sums, [groupId, { sum }]) => {
          sums[groupId] = sum
          return sums
        }, {})
    } else if (isSameDate(currentDate, date)) {
      // Check if current sum is greater
      const sums = maxSumsPerDayPerGroup[getDate(date)]
      Object.entries(groups).forEach(([groupId, { sum }]) => {
        sums[groupId] = sum > sums[groupId] ? sum : sums[groupId]
      })
    }
  }
  return maxSumsPerDayPerGroup
}

function updateSums (maxSumsPerDayPerGroup, data) {
  let currentDate = null
  let scale
  for (let i = 0; i < data.length; i++) {
    const { date, ...groups } = data[i]
    if (!currentDate || !isSameDate(currentDate, date)) {
      currentDate = date
    }
    Object.entries(groups)
      .forEach(([groupId, { sum }]) => {
        scale = scaleLinear()
          .domain([0, maxSumsPerDayPerGroup[getDate(date)][groupId]])
          .range([0, 1])
        data[i][groupId].sum = scale(sum)
      })
  }
}
