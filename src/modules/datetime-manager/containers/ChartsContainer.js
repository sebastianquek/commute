import { connect } from 'react-redux'
import { setDatetimeZoomDomain } from '../actions'
import { ridershipDataSelector, minDateSelector, maxDateSelector, zoomDomainSelector, stepSelector, maxRidershipRangeSelector } from '../selectors'
import zoneManager from '../../zone-manager'
import Charts from '../components/Charts'

const mapStateToProps = (state, ownProps) => {
  return {
    minDate: minDateSelector(state),
    maxDate: maxDateSelector(state),
    step: stepSelector(state),
    data: ridershipDataSelector(state),
    zoomDomain: zoomDomainSelector(state),
    groupColors: zoneManager.selectors.groupColorsSelector(state),
    maxY: maxRidershipRangeSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setDatetimeZoomDomain
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Charts)
