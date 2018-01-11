import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { goToAnchor } from 'react-scrollable-anchor'
import ZoneManager from '../components/ZoneManager'
import SelectedZoneButton from '../components/SelectedZoneButton'
import { removeSelection, setOriginSelectionMode, setDestinationSelectionMode } from '../actions'
import { originZonesSelector, destinationsZonesSelector } from '../selectors'

const ZoneManagerContainer = ({
  origins, destinations, removeSelection,
  setOriginSelectionMode, setDestinationSelectionMode
}) => {
  let counter = 1
  return (
    <ZoneManager
      origins={origins && origins.map(zone =>
        <SelectedZoneButton
          key={zone.id}
          color={zone.color}
          onClick={() => goToAnchor('' + zone.id, false)}
          onClickDelete={() => removeSelection(zone.id, 'origins')}>
          {counter++}
        </SelectedZoneButton>
      )}
      destinations={destinations && destinations.map(zone =>
        <SelectedZoneButton
          key={zone.id}
          color={zone.color}
          onClick={() => goToAnchor('' + zone.id, false)}
          onClickDelete={() => removeSelection(zone.id, 'destinations')}>
          {counter++}
        </SelectedZoneButton>
      )}
      setOriginSelectionMode={setOriginSelectionMode}
      setDestinationSelectionMode={setDestinationSelectionMode}
    />
  )
}

ZoneManagerContainer.propTypes = {
  origins: PropTypes.arrayOf(PropTypes.object),
  destinations: PropTypes.arrayOf(PropTypes.object),
  removeSelection: PropTypes.func,
  setOriginSelectionMode: PropTypes.func,
  setDestinationSelectionMode: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    origins: originZonesSelector(state),
    destinations: destinationsZonesSelector(state),
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
