import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setFirstDatetime } from '../actions'
import { dateDomainSelector } from '../selectors'
import DatetimePicker from '../components/DatetimePicker'

const DatetimePickerContainer = ({
  dateDomain,
  setFirstDatetime
}) => {
  return (
    <DatetimePicker
      dateDomain={dateDomain}
      setFirstDatetime={setFirstDatetime}
    />
  )
}

DatetimePickerContainer.propTypes = {
  dateDomain: PropTypes.array,
  setFirstDatetime: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    dateDomain: dateDomainSelector(state),
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
