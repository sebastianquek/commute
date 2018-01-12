import React from 'react'
import { connect } from 'react-redux'
import { originZonesDataSelector } from '../selectors'
import OriginZonesDataRows from '../components/OriginZonesDataRows'

const OriginZonesDataRowsContainer = (props) => {
  return (
    <OriginZonesDataRows {...props} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    originZones: originZonesDataSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OriginZonesDataRowsContainer)
