import { connect } from 'react-redux'
import { setDatetimeBrushDomain, setDatetimeZoomDomain, resetForceDatetimeSliderUpdate } from '../actions'
import {
  brushDomainSelector, zoomDomainSelector, minDateSelector,
  maxDateSelector, stepSelector, ridershipDataSelector,
  shouldDatetimeSliderUpdate
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
    zoneIds: zoneManager.selectors.allZoneIdsSelector(state),
    shouldUpdate: shouldDatetimeSliderUpdate(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setDatetimeBrushDomain,
  setDatetimeZoomDomain,
  resetForceDatetimeSliderUpdate
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatetimeSlider)
