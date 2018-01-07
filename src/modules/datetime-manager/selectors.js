// import { createSelector } from 'reselect'

export const brushDomainSelector = state => ({
  x: state.datetimeBrushDomain.x,
  y: state.datetimeBrushDomain.y
})

export const dateDomainSelector = state => state.datetimeBrushDomain.x
