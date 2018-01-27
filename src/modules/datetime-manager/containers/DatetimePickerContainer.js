import { connect } from 'react-redux'
import { setStartDatetime } from '../actions'
import { brushedDateDomainSelector, zoomedDateDomainSelector, minDateSelector, maxDateSelector } from '../selectors'
import DatetimePicker from '../components/DatetimePicker'

const mapStateToProps = (state, ownProps) => {
  return {
    brushedDateDomain: brushedDateDomainSelector(state),
    zoomedDateDomain: zoomedDateDomainSelector(state),
    minDate: minDateSelector(state),
    maxDate: maxDateSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setStartDatetime
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatetimePicker)
