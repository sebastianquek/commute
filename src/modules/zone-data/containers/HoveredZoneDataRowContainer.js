import React from 'react'
import { connect } from 'react-redux'
import { currentZoneDataSelector } from '../selectors'
import HoveredZoneDataRow from '../components/HoveredZoneDataRow'

const HoveredZoneDataRowContainer = (props) => {
  return (
    <HoveredZoneDataRow {...props} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    hoveredZone: currentZoneDataSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoveredZoneDataRowContainer)
