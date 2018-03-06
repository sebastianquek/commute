import moment from 'moment'
import get from 'lodash.get'
import omit from 'lodash.omit'
import pick from 'lodash.pick'
import * as t from './actionTypes'
import zoneManager from '../zone-manager'

const minDate = moment('2016-07-10T00:00:00+08:00').toDate()
const maxDate = moment('2016-07-15T23:59:59+08:00').toDate()

export const datetimeBrushDomain = (state = {
  x: [moment('2016-07-13T10:00:00+08:00').toDate(), moment('2016-07-14T06:00:00+08:00').toDate()],
  y: [0, 1]
}, action) => {
  switch (action.type) {
    case t.SET_DATETIME_BRUSH_DOMAIN:
      return {
        ...state,
        x: action.domain.x,
        y: action.domain.y
      }
    case t.SET_START_DATETIME_BRUSH_DOMAIN:
      const currentBrushStart = moment(state.x[0])
      const duration = moment.duration(moment(state.x[1]).diff(currentBrushStart))
      const x0 = moment(action.startDatetime)
      x0.hours(currentBrushStart.hours())
      x0.minutes(currentBrushStart.minutes())
      x0.seconds(currentBrushStart.seconds())
      x0.milliseconds(currentBrushStart.milliseconds())

      // Ensure start of new brush domain is within the bounds
      if (x0.isSameOrAfter(action.maxDate)) {
        return state
      }

      const x1 = x0.clone().add(duration)
      return {
        ...state,
        x: [x0.toDate(), x1.isBefore(action.maxDate) ? x1.toDate() : action.maxDate]
      }
    default:
      return state
  }
}

export const datetimeZoomDomain = (state = {
  x: [minDate, maxDate]
}, action) => {
  switch (action.type) {
    case t.SET_DATETIME_ZOOM_DOMAIN:
      return {
        ...state,
        x: action.domain.x,
        y: action.domain.y
      }
    default:
      return state
  }
}

export const ridershipDomain = (state = {
  minX: minDate,
  maxX: maxDate,
  step: 'PT1H'
}, action) => {
  switch (action.type) {
    case t.SET_STEP:
      return {
        ...state,
        step: action.step
      }
    default:
      return state
  }
}

export const ridershipData = (state = { departureData: [], arrivalData: [] }, action) => {
  switch (action.type) {
    case t.RECEIVE_RIDERSHIP:
      const departureData = []
      const arrivalData = []
      action.data.forEach((step, i) => {
        const row = { date: moment(step['start_time']) }
        const departureRow = { ...row }
        const arrivalRow = { ...row }

        action.groups.forEach(({ groupId, zoneIds }) => {
          const groupDepartureData = { sum: 0 }
          const groupArrivalData = { sum: 0 }
          zoneIds.forEach(zone => {
            const existingZoneDepartures = get(state.departureData, [i, groupId, zone], 0)
            const existingZoneArrivals = get(state.arrivalData, [i, groupId, zone], 0)
            if (step.counts && step.counts['' + zone]) { // zone has arrivals/departures
              const counts = step.counts['' + zone]
              groupDepartureData[zone] = counts.departure || 0
              groupArrivalData[zone] = counts.arrival || 0
              groupDepartureData.sum += groupDepartureData[zone]
              groupArrivalData.sum += groupArrivalData[zone]
            } else if (existingZoneDepartures || existingZoneArrivals) {
              groupDepartureData[zone] = existingZoneDepartures
              groupArrivalData[zone] = existingZoneArrivals
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

        arrivalData.push(arrivalRow)
        departureData.push(departureRow)
      })
      return {
        departureData,
        arrivalData
      }
    case zoneManager.actionTypes.REMOVE_ZONE_FROM_GROUP:
      const removeZone = data => data.map(step => {
        const { [action.groupId]: group, ...groups } = step
        const { [action.zoneId]: zone, ...zones } = group
        zones.sum -= zone
        return {
          ...groups,
          [action.groupId]: zones
        }
      })
      return {
        departureData: removeZone(state.departureData),
        arrivalData: removeZone(state.arrivalData)
      }
    case zoneManager.actionTypes.REMOVE_GROUP:
      return {
        departureData: state.departureData.map(step => omit(step, action.groupId)),
        arrivalData: state.arrivalData.map(step => omit(step, action.groupId))
      }
    default:
      return state
  }
}

export const datetimeManagerInterfaceFlags = (state = {
  shouldDatetimeSliderUpdate: false,
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
