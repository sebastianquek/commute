import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Map from '../components/Map'
import { fetchZones, hoverOverFeature, colorSelectedZones } from '../actions'
import zoneManager from '../../zone-manager'

const MapContainer = (props) => {
  return (
    <Map
      {...props}
    />
  )
}

MapContainer.propTypes = {
  mapStyle: PropTypes.object.isRequired,
  zoneSelectionMode: PropTypes.string,
  categorizedZones: PropTypes.object.isRequired,
  fetchZones: PropTypes.func.isRequired,
  hoverOverFeature: PropTypes.func.isRequired,
  addSelection: PropTypes.func.isRequired,
  resetSelectionMode: PropTypes.func.isRequired,
  colorSelectedZones: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    mapStyle: state.map.mapStyle,
    zoneSelectionMode: state.zoneManager.zoneSelectionMode,
    categorizedZones: state.zoneManager.categorizedZones,
    ...ownProps
  }
}

const mapDispatchToProps = {
  fetchZones,
  hoverOverFeature,
  addSelection: zoneManager.actions.addSelection,
  resetSelectionMode: zoneManager.actions.resetSelectionMode,
  colorSelectedZones
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer)
