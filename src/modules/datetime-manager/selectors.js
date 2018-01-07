// import { createSelector } from 'reselect'

export const brushDomainSelector = state => ({
  x: state.datetimeBrushDomain.x,
  y: state.datetimeBrushDomain.y
})

export const currentDateSelector = state => {
  if (state.datetimeBrushDomain.x) {
    return state.datetimeBrushDomain.x[0]
  }
  return {}
}
