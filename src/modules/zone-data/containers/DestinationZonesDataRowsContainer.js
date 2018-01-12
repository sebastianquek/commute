import React from 'react'
import { connect } from 'react-redux'
import { destinationZonesDataSelector, numOriginZonesSelector } from '../selectors'
import DestinationZonesDataRows from '../components/DestinationZonesDataRows'

const DestinationZonesDataRowsContainer = (props) => {
  return (
    <DestinationZonesDataRows {...props} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    destinationZones: destinationZonesDataSelector(state),
    initialIdx: numOriginZonesSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DestinationZonesDataRowsContainer)
