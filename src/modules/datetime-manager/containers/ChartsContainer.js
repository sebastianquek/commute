import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setDatetimeZoomDomain } from '../actions'
import { ridershipDataSelector, minDateSelector, maxDateSelector, zoomDomainSelector, stepSelector, maxRidershipRangeSelector } from '../selectors'
import zoneManager from '../../zone-manager'
import Charts from '../components/Charts'

const ChartsContainer = props => <Charts {...props} />

ChartsContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

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
)(ChartsContainer)
