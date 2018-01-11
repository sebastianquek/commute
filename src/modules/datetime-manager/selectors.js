// import { createSelector } from 'reselect'

export const brushDomainSelector = state => ({
  x: state.datetimeBrushDomain.x,
  y: state.datetimeBrushDomain.y
})

export const dateDomainSelector = state => state.datetimeBrushDomain.x
export const minDateSelector = state => state.datetimeBrushDomain.minX
export const maxDateSelector = state => state.datetimeBrushDomain.maxX
export const stepSelector = state => state.datetimeBrushDomain.step

export const ridershipDataSelector = state => {
  // Need to filter out the relevant data in the current time window
  return state.ridershipData
}