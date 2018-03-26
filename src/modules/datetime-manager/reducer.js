import moment from 'moment'
import get from 'lodash.get'
import omit from 'lodash.omit'
import * as t from './actionTypes'
import zoneManager from '../zone-manager'

const windowDomainDaysOffset = 3
const defaultZoomMinDate = moment('2016-07-10T00:00:00+08:00').toDate()
const defaultZoomMaxDate = moment('2016-07-17T00:00:00+08:00').toDate()

export const datetimeBrushDomain = (state = [
  moment('2016-07-13T01:00:00+08:00').toDate(),
  moment('2016-07-14T00:00:00+08:00').toDate()
], action) => {
  switch (action.type) {
    case t.SET_DATETIME_BRUSH_DOMAIN:
      return action.domain

    case t.SET_START_DATETIME_BRUSH_DOMAIN:
      const currentBrushStart = moment(state[0])
      const duration = moment.duration(moment(state[1]).diff(currentBrushStart))
      const x0 = moment(action.startDatetime)
      x0.hours(currentBrushStart.hours())
      x0.minutes(currentBrushStart.minutes())
      x0.seconds(currentBrushStart.seconds())
      x0.milliseconds(currentBrushStart.milliseconds())

      // Ensure start of new brush domain is within the max bounds
      if (x0.isSameOrAfter(action.maxDate)) {
        return state
      }

      const x1 = x0.clone().add(duration)
      return [
        x0.toDate(),
        x1.isBefore(action.maxDate) ? x1.toDate() : action.maxDate
      ]

    default:
      return state
  }
}

export const datetimeZoomDomain = (state = [
  defaultZoomMinDate, defaultZoomMaxDate
], action) => {
  switch (action.type) {
    case t.SET_DATETIME_ZOOM_DOMAIN:
      return action.domain

    default:
      return state
  }
}

export const ridershipDomain = (state = {
  step: 'PT1H',
  windowDomain: [
    moment(defaultZoomMinDate).subtract(windowDomainDaysOffset, 'days')
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toDate(),
    moment(defaultZoomMaxDate).add(windowDomainDaysOffset + 1, 'days')
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toDate()
  ],
  dataDomain: [[]], // Array of intervals
  absoluteDomain: [
    moment('2016-07-01T00:00:00+08:00').toDate(),
    moment('2016-08-01T00:00:00+08:00').toDate()
  ]
}, action) => {
  switch (action.type) {
    case t.SET_STEP:
      return {
        ...state,
        step: action.step
      }

    case t.SET_WINDOW_DOMAIN:
      return {
        ...state,
        windowDomain: action.domain
      }

    case t.SET_DATA_DOMAIN:
      return {
        ...state,
        dataDomain: action.domain
      }

    default:
      return state
  }
}

export const ridershipData = (state = {
  departureData: {},
  arrivalData: {}
}, action) => {
  switch (action.type) {
    case t.RECEIVE_ALL_RIDERSHIP:
      const departureData = {}
      const arrivalData = {}

      // Generate 2 objects, 1 for departures and 1 for arrivals
      // with the following shape:
      //  {
      //    <moment date>: {
      //      <group id 1>: {
      //        <zone id 1>: <number of arrivals/departures>
      //        <zone id 2>: <number of arrivals/departures>
      //        sum: <sum>
      //      },
      //      <group id 2>: {
      //        <zone id 3>: <number of arrivals/departures>
      //        <zone id 4>: <number of arrivals/departures>
      //        sum: <sum>
      //      }
      //    }
      //  }
      action.data.forEach((step, i) => {
        const departureRow = {}
        const arrivalRow = {}

        action.groups.forEach(({ groupId, zoneIds }) => {
          const groupDepartureData = { sum: 0 }
          const groupArrivalData = { sum: 0 }

          zoneIds.forEach(zone => {
            if (step.counts && step.counts['' + zone]) { // zone has arrivals/departures
              const counts = step.counts['' + zone]
              groupDepartureData[zone] = counts.departure || 0
              groupArrivalData[zone] = counts.arrival || 0
              groupDepartureData.sum += groupDepartureData[zone]
              groupArrivalData.sum += groupArrivalData[zone]
            } else {
              groupDepartureData[zone] = 0
              groupArrivalData[zone] = 0
            }
          })

          departureRow[groupId] = groupDepartureData
          arrivalRow[groupId] = groupArrivalData
        })

        arrivalData[moment(step['start_time'])] = arrivalRow
        departureData[moment(step['start_time'])] = departureRow
      })
      return {
        departureData,
        arrivalData
      }

    case zoneManager.actionTypes.REMOVE_ZONE_FROM_GROUP:
      const removeZone = data => Object.entries(data)
        .reduce((updatedData, [date, step]) => {
          const {
            [action.groupId]: {
              [action.zoneId]: count,
              ...zones
            },
            ...groups
          } = step

          updatedData[date] = {
            [action.groupId]: {
              ...zones,
              sum: zones.sum - count
            },
            ...groups
          }

          return updatedData
        }, {})
      return {
        departureData: removeZone(state.departureData),
        arrivalData: removeZone(state.arrivalData)
      }

    case zoneManager.actionTypes.REMOVE_GROUP:
      const removeGroup = data => Object.entries(data)
        .reduce((updatedData, [date, step]) => {
          updatedData[date] = omit(step, action.groupId)
          return updatedData
        }, {})
      return {
        departureData: removeGroup(state.departureData),
        arrivalData: removeGroup(state.arrivalData)
      }

    default:
      return state
  }
}

export const datetimeManagerInterfaceFlags = (state = {
  shouldDatetimeSliderUpdate: true,
  isFetchingRidershipData: true
}, action) => {
  switch (action.type) {
    case t.FORCE_DATETIME_SLIDER_UPDATE:
      return {
        ...state,
        shouldDatetimeSliderUpdate: true
      }
    case t.RESET_FORCE_DATETIME_SLIDER_UPDATE:
      return {
        ...state,
        shouldDatetimeSliderUpdate: false
      }
    case t.FETCHING_RIDERSHIP:
      return {
        ...state,
        isFetchingRidershipData: true
      }
    case t.RECEIVE_RIDERSHIP:
      return {
        ...state,
        isFetchingRidershipData: false
      }
    default:
      return state
  }
}
