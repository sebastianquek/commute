import React from 'react'
import { connect } from 'react-redux'
import Map from '../components/Map'
import { mapStyleSelector } from '../selectors'
import { mapHasLoaded, initMapStyle, hoverOverFeature, clickFeatures } from '../actions'
import zoneManager from '../../zone-manager'
import SelectionModeFeedback from '../components/SelectionModeFeedback'

const MapContainer = (props) => {
  return (
    <div>
      <Map
        mapStyle={props.mapStyle}
        mapHasLoaded={props.mapHasLoaded}
        initMapStyle={props.initMapStyle}
        hoverOverFeature={props.hoverOverFeature}
        clickFeatures={props.clickFeatures}
      >
      </Map>
      {props.zoneSelectionMode &&
        <SelectionModeFeedback
          zoneSelectionMode={props.zoneSelectionMode}
          resetSelectionMode={props.resetSelectionMode}
          editingGroup={props.editingGroup}
        />
      }
    </div>
  )
}

MapContainer.propTypes = {
  ...Map.propTypes,
  ...SelectionModeFeedback.propTypes
}

const mapStateToProps = state => ({
  mapStyle: mapStyleSelector(state),
  zoneSelectionMode: zoneManager.selectors.zoneSelectionModeSelector(state),
  editingGroup: zoneManager.selectors.editingGroupSelector(state),
  editingGroupCounter: zoneManager.selectors.editingGroupCounterSelector(state)
})

const mapDispatchToProps = {
  mapHasLoaded,
  initMapStyle,
  hoverOverFeature,
  clickFeatures,
  resetSelectionMode: zoneManager.actions.resetSelectionMode
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer)
