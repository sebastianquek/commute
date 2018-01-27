import { connect } from 'react-redux'
import { setDatetimeBrushDomain, setDatetimeZoomDomain } from '../actions'
import { brushDomainSelector, zoomDomainSelector, minDateSelector, maxDateSelector, stepSelector } from '../selectors'
import Brushes from '../components/Brushes'

const mapStateToProps = (state, ownProps) => {
  return {
    brushDomain: brushDomainSelector(state),
    zoomDomain: zoomDomainSelector(state),
    minDate: minDateSelector(state),
    maxDate: maxDateSelector(state),
    step: stepSelector(state),
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
)(Brushes)
