import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setDatetimeBrushDomain } from '../actions'
import { brushDomainSelector, minDateSelector, maxDateSelector, stepSelector } from '../selectors'
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
    minDate: minDateSelector(state),
    maxDate: maxDateSelector(state),
    step: stepSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setDatetimeBrushDomain
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrushContainer)
