import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { goToAnchor } from 'react-scrollable-anchor'
import ZoneManager from '../components/ZoneManager'
import SelectedZoneButton from '../components/SelectedZoneButton'
import { removeSelection, setOriginSelectionMode, setDestinationSelectionMode } from '../actions'

const ZoneManagerContainer = ({
  origins, destinations, removeSelection,
  setOriginSelectionMode, setDestinationSelectionMode
}) => {
  let counter = 1
  return (
    <ZoneManager
      origins={origins && origins.map(zoneId =>
        <SelectedZoneButton
          key={zoneId}
          onClick={() => goToAnchor('' + zoneId, false)}
          onClickDelete={() => removeSelection(zoneId, 'origins')}>
          {counter++}
        </SelectedZoneButton>
      )}
      destinations={destinations && destinations.map(zoneId =>
        <SelectedZoneButton
          key={zoneId}
          onClick={() => {
            goToAnchor('' + zoneId, false)
          }}
          onClickDelete={() => removeSelection(zoneId, 'destinations')}>
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
  removeSelection: PropTypes.func,
  setOriginSelectionMode: PropTypes.func,
  setDestinationSelectionMode: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    origins: state.zoneManager.categorizedZones.origins,
    destinations: state.zoneManager.categorizedZones.destinations,
    ...ownProps
  }
}

const mapDispatchToProps = {
  removeSelection, setOriginSelectionMode, setDestinationSelectionMode
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZoneManagerContainer)
