import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setFirstDatetime } from '../actions'
import { dateDomainSelector, minDateSelector, maxDateSelector } from '../selectors'
import DatetimePicker from '../components/DatetimePicker'

const DatetimePickerContainer = (props) => {
  return (
    <DatetimePicker {...props} />
  )
}

DatetimePickerContainer.propTypes = {
  dateDomain: PropTypes.array,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  setFirstDatetime: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    dateDomain: dateDomainSelector(state),
    minDate: minDateSelector(state),
    maxDate: maxDateSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setFirstDatetime
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatetimePickerContainer)
