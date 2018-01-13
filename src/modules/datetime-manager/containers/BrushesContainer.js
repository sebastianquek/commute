import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setDatetimeBrushDomain, setDatetimeZoomDomain } from '../actions'
import { brushDomainSelector, zoomDomainSelector, minDateSelector, maxDateSelector, stepSelector } from '../selectors'
import Brushes from '../components/Brushes'

const BrushContainer = (props) => {
  return (
    <Brushes {...props} />
  )
}

BrushContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    brushDomain: brushDomainSelector(state),
    zoomDomain: zoomDomainSelector(state),
    minDate: minDateSelector(state),
    maxDate: maxDateSelector(state),
    step: stepSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setDatetimeBrushDomain,
  setDatetimeZoomDomain
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrushContainer)
