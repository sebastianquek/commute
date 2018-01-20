import React from 'react'
import { connect } from 'react-redux'
import { hoveredZoneCompositionDataSelector } from '../selectors'
import HoveredZoneDataRow from '../components/HoveredZoneDataRow'

const HoveredZoneDataRowContainer = (props) => {
  return (
    <HoveredZoneDataRow {...props} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    zoneComposition: hoveredZoneCompositionDataSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoveredZoneDataRowContainer)
