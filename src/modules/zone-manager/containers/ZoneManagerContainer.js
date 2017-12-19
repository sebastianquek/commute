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
      origins={origins && origins.map(zoneId =>
        <SelectedZoneButton
          key={zoneId}
          onClick={() => ''}
          onClickDelete={() => remove(zoneId, 'origins')}>
          {counter++}
        </SelectedZoneButton>
      )}
      destinations={destinations && destinations.map(zoneId =>
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
  origins: PropTypes.arrayOf(PropTypes.number),
  destinations: PropTypes.arrayOf(PropTypes.number),
  remove: PropTypes.func,
  setOriginSelectionMode: PropTypes.func,
  setDestinationSelectionMode: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    origins: state.zoneSelections.categorizedZones.origins,
    destinations: state.zoneSelections.categorizedZones.destinations,
    ...ownProps
  }
}

const mapDispatchToProps = {
  remove, setOriginSelectionMode, setDestinationSelectionMode
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZoneManagerContainer)
