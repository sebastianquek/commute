import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ZoneManager from '../components/ZoneManager'
import SelectedZoneButton from '../components/SelectedZoneButton'
import { add, remove, setOriginSelectionMode, setDestinationSelectionMode } from '../actions'

const ZoneManagerContainer = ({
  origins, destinations, remove,
  setOriginSelectionMode, setDestinationSelectionMode
}) => {
  let counter = 1
  return (
    <ZoneManager
      origins={origins.map(zoneId =>
        <SelectedZoneButton
          key={zoneId}
          onClick={() => ''}
          onClickDelete={() => remove(zoneId, 'origins')}>
          {counter++}
        </SelectedZoneButton>
      )}
      destinations={destinations.map(zoneId =>
        <SelectedZoneButton
          key={zoneId}
          onClick={() => ''}
          onClickDelete={() => remove(zoneId, 'destinations')}>
          {counter++}
        </SelectedZoneButton>
      )}
      setOriginSelectionMode={setOriginSelectionMode}
      setDestinationSelectionMode={setDestinationSelectionMode}
    />
  )
}

ZoneManagerContainer.propTypes = {
  origins: PropTypes.node,
  destinations: PropTypes.node,
  remove: PropTypes.func,
  setOriginSelectionMode: PropTypes.func,
  setDestinationSelectionMode: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    origins: ownProps.origins || state.zoneSelections.categorizedZones.origins,
    destinations: ownProps.destinations || state.zoneSelections.categorizedZones.destinations
  }
}

const mapDispatchToProps = {
  remove, setOriginSelectionMode, setDestinationSelectionMode
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZoneManagerContainer)
