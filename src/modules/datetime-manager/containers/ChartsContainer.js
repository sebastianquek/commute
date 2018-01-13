import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchRidership } from '../actions'
import { ridershipDataSelector, minDateSelector, maxDateSelector, stepSelector } from '../selectors'
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
    zoneColors: zoneManager.selectors.zoneColorsSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  fetchRidership
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsContainer)
