import moment from 'moment'
import * as t from './actionTypes'

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

export const ridershipData = (state = {}, action) => {
  switch (action.type) {
    case t.REQUEST_RIDERSHIP:
      return state
    case t.RECEIVE_RIDERSHIP:
      const data = action.data.reduce((all, step) => {
        if (step.counts) {
          Object.keys(step.counts).forEach(id => {
            const counts = step.counts[id]
            if (!all.hasOwnProperty(id)) all[id] = {}
            all[id][step['start_time']] = counts
          })
        }
        return all
      }, {})
      return {
        ...state,
        ...data
      }
    default:
      return state
  }
}
