import { connect } from 'react-redux'
import {
  setDatetimeBrushDomain, setDatetimeZoomDomain,
  resetForceDatetimeSliderUpdate
} from '../actions'
import {
  datetimeBrushDomainSelector, datetimeZoomDomainSelector, stepSelector,
  ridershipDataSelector, shouldDatetimeSliderUpdate, isFetchingRidershipData
} from '../selectors'
import zoneManager from '../../zone-manager'
import DatetimeSlider from '../components/DatetimeSlider'

const mapStateToProps = (state, ownProps) => {
  return {
    brushDomain: datetimeBrushDomainSelector(state),
    zoomDomain: datetimeZoomDomainSelector(state),
    step: stepSelector(state),
    data: ridershipDataSelector(state),
    groupColors: zoneManager.selectors.groupColorsSelector(state),
    zoneIds: zoneManager.selectors.allZoneIdsSelector(state),
    shouldUpdate: shouldDatetimeSliderUpdate(state),
    isFetchingRidershipData: isFetchingRidershipData(state),
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
