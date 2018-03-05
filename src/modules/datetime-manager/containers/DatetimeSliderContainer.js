import { connect } from 'react-redux'
import { setDatetimeBrushDomain, setDatetimeZoomDomain } from '../actions'
import {
  brushDomainSelector, zoomDomainSelector, minDateSelector,
  maxDateSelector, stepSelector, ridershipDataSelector
} from '../selectors'
import zoneManager from '../../zone-manager'
import DatetimeSlider from '../components/DatetimeSlider'

const mapStateToProps = (state, ownProps) => {
  return {
    brushDomain: brushDomainSelector(state),
    zoomDomain: zoomDomainSelector(state),
    minDate: minDateSelector(state),
    maxDate: maxDateSelector(state),
    step: stepSelector(state),
    data: ridershipDataSelector(state),
    groupColors: zoneManager.selectors.groupColorsSelector(state),
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
)(DatetimeSlider)
