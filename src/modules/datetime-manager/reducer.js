import moment from 'moment'
import * as t from './actionTypes'

export const datetimeBrushDomain = (state = {
  x: [moment('2017-10-21T00:00:00+08:00').toDate(), moment('2017-10-25T00:00:00+08:00').toDate()],
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
      const duration = moment.duration(moment(state.x[1]).diff(moment(state.x[0])))
      const x1 = moment(action.startDatetime).add(duration)
      return {
        ...state,
        x: [action.startDatetime, x1.isBefore(action.maxDate) ? x1.toDate() : action.maxDate]
      }
    default:
      return state
  }
}

export const datetimeZoomDomain = (state = {
  x: [moment('2017-10-21T00:00:00+08:00').toDate(), moment('2017-10-25T00:00:00+08:00').toDate()]
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
  minX: moment('2017-10-21T00:00:00+08:00').toDate(),
  maxX: moment('2017-10-25T00:00:00+08:00').toDate(),
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
