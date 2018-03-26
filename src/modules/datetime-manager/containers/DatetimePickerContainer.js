import { connect } from 'react-redux'
import { setStartDatetime, forceDatetimeSliderUpdate } from '../actions'
import {
  datetimeBrushDomainSelector, datetimeZoomDomainSelector,
  minDateSelector, maxDateSelector
} from '../selectors'
import DatetimePicker from '../components/DatetimePicker'

const mapStateToProps = (state, ownProps) => {
  return {
    brushedDateDomain: datetimeBrushDomainSelector(state),
    zoomedDateDomain: datetimeZoomDomainSelector(state),
    minDate: minDateSelector(state),
    maxDate: maxDateSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setStartDatetime,
  forceDatetimeSliderUpdate
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatetimePicker)
