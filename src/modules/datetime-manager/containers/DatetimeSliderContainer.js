import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setDatetimeBrushDomain } from '../actions'
import { brushDomainSelector } from '../selectors'
import DatetimeSlider from '../components/DatetimeSlider'

const DatetimeSliderContainer = ({
  brushDomain,
  setDatetimeBrushDomain
}) => {
  return (
    <DatetimeSlider
      brushDomain={brushDomain}
      setDatetimeBrushDomain={setDatetimeBrushDomain}
    />
  )
}

DatetimeSliderContainer.propTypes = {
  brushDomain: PropTypes.object,
  setDatetimeBrushDomain: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    brushDomain: brushDomainSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setDatetimeBrushDomain
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatetimeSliderContainer)
