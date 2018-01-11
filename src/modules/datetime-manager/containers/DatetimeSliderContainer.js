import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setDatetimeBrushDomain, fetchRidership } from '../actions'
import { brushDomainSelector, ridershipDataSelector, minDateSelector, maxDateSelector, stepSelector } from '../selectors'
import zoneManager from '../../zone-manager'
import DatetimeSlider from '../components/DatetimeSlider'

const DatetimeSliderContainer = (props) => {
  return (
    <DatetimeSlider {...props} />
  )
}

DatetimeSliderContainer.propTypes = {
  brushDomain: PropTypes.object,
  data: PropTypes.object,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  step: PropTypes.string,
  zoneColors: PropTypes.object,
  setDatetimeBrushDomain: PropTypes.func,
  fetchRidership: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    brushDomain: brushDomainSelector(state),
    data: ridershipDataSelector(state),
    minDate: minDateSelector(state),
    maxDate: maxDateSelector(state),
    step: stepSelector(state),
    zoneColors: zoneManager.selectors.zoneColorsSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setDatetimeBrushDomain,
  fetchRidership
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatetimeSliderContainer)
