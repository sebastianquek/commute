import { connect } from 'react-redux'
import { setStartDatetime, forceDatetimeSliderUpdate } from '../actions'
import {
  datetimeBrushDomainSelector, datetimeZoomDomainSelector,
  absoluteMinDateSelector, absoluteMaxDateSelector
} from '../selectors'
import DatetimePicker from '../components/DatetimePicker'

const mapStateToProps = (state, ownProps) => {
  return {
    brushedDateDomain: datetimeBrushDomainSelector(state),
    zoomedDateDomain: datetimeZoomDomainSelector(state),
    minDate: absoluteMinDateSelector(state),
    maxDate: absoluteMaxDateSelector(state),
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
