import React from 'react'
import { connect } from 'react-redux'
import Map from '../components/Map'
import { mapStyleSelector } from '../selectors'
import { mapHasLoaded, hoverOverFeature, clickFeatures } from '../actions'
import zoneManager from '../../zone-manager'
import SelectionModeFeedback from '../components/SelectionModeFeedback'

const MapContainer = (props) => {
  return (
    <div>
      <Map
        mapStyle={props.mapStyle}
        mapHasLoaded={props.mapHasLoaded}
        hoverOverFeature={props.hoverOverFeature}
        clickFeatures={props.clickFeatures}
      >
      </Map>
      {props.zoneSelectionMode &&
        <SelectionModeFeedback
          zoneSelectionMode={props.zoneSelectionMode}
          resetSelectionMode={props.resetSelectionMode}
          editingGroup={props.editingGroup}
          editingGroupCounter={props.editingGroupCounter}
        />
      }
    </div>
  )
}

MapContainer.propTypes = {
  ...Map.propTypes,
  ...SelectionModeFeedback.propTypes
}

const mapStateToProps = state => {
  return {
    mapStyle: mapStyleSelector(state),
    zoneSelectionMode: zoneManager.selectors.zoneSelectionModeSelector(state),
    editingGroup: zoneManager.selectors.editingGroupSelector(state),
    editingGroupCounter: zoneManager.selectors.editingGroupCounterSelector(state)
  }
}

const mapDispatchToProps = {
  mapHasLoaded,
  hoverOverFeature,
  clickFeatures,
  resetSelectionMode: zoneManager.actions.resetSelectionMode
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer)
