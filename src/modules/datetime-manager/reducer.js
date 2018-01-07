import moment from 'moment'
import * as t from './actionTypes'

const datetimeBrushDomain = (state = {
  x: [moment('2016-10-01').toDate(), moment('2016-11-26').toDate()],
  minX: moment('2016-10-01').toDate(),
  maxX: moment('2016-11-26').toDate()
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

export default datetimeBrushDomain
