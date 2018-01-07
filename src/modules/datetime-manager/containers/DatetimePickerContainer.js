import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setFirstDatetime } from '../actions'
import { currentDateSelector } from '../selectors'
import DatetimePicker from '../components/DatetimePicker'

const DatetimePickerContainer = ({
  date,
  setFirstDatetime
}) => {
  return (
    <DatetimePicker
      date={date}
      setFirstDatetime={setFirstDatetime}
    />
  )
}

DatetimePickerContainer.propTypes = {
  date: PropTypes.object,
  setFirstDatetime: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    date: currentDateSelector(state),
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
