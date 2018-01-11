import moment from 'moment'
import * as t from './actionTypes'

export const datetimeBrushDomain = (state = {
  x: [moment('2017-10-21T00:00:00+08:00').toDate(), moment('2017-10-25T00:00:00+08:00').toDate()],
  minX: moment('2017-10-21T00:00:00+08:00').toDate(),
  maxX: moment('2017-10-25T00:00:00+08:00').toDate(),
  step: 'PT1H'
}, action) => {
  switch (action.type) {
    case t.SET_DATETIME_BRUSH_DOMAIN:
      return {
        ...state,
        x: action.domain.x,
        y: action.domain.y
      }
    case t.SET_FIRST_DATETIME:
      const duration = moment.duration(moment(state.x[1]).diff(moment(state.x[0])))
      const x1 = moment(action.firstDatetime).add(duration)
      return {
        ...state,
        x: [action.firstDatetime, x1.isBefore(state.maxX) ? x1.toDate() : state.maxX]
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
