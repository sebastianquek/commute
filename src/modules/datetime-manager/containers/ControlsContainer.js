import React from 'react'
import { connect } from 'react-redux'
import { setStep } from '../actions'
import { stepSelector } from '../selectors'
import Controls from '../components/Controls'

const ControlsContainer = (props) => {
  return (
    <Controls {...props} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    step: stepSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setStep
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsContainer)
