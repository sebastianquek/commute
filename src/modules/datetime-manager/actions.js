import * as t from './actionTypes'

export const setDatetimeBrushDomain = domain => ({
  type: t.SET_DATETIME_BRUSH_DOMAIN,
  domain
})

export const setFirstDatetime = datetime => ({
  type: t.SET_FIRST_DATETIME,
  firstDatetime: datetime
})
