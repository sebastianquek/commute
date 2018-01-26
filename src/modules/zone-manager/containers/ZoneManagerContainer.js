import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { goToAnchor } from 'react-scrollable-anchor'
import ZoneManager from '../components/ZoneManager'
import SelectedZoneButton from '../components/SelectedZoneButton'
import { setOriginSelectionMode, setDestinationSelectionMode, removeGroup, setEditingGroup } from '../actions'
import { originGroupsSelector, destinationGroupsSelector } from '../selectors'

const ZoneManagerContainer = ({
  origins, destinations, setEditingGroup, removeGroup,
  setOriginSelectionMode, setDestinationSelectionMode
}) => {
  const initialIdx = origins.length
  return (
    <ZoneManager
      origins={origins && origins.map((group, idx) =>
        <SelectedZoneButton
          key={group.groupId}
          color={group.color}
          onClick={() => goToAnchor('' + group.groupId, false)}
          onClickEdit={() => setEditingGroup(group.groupId)}
          onClickDelete={() => removeGroup(group.groupId, 'origins')}>
          {idx + 1}
        </SelectedZoneButton>
      )}
      destinations={destinations && destinations.map((group, idx) =>
        <SelectedZoneButton
          key={group.groupId}
          color={group.color}
          onClick={() => goToAnchor('' + group.groupId, false)}
          onClickEdit={() => setEditingGroup(group.groupId)}
          onClickDelete={() => removeGroup(group.groupId, 'destinations')}>
          {initialIdx + idx + 1}
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
  setEditingGroup: PropTypes.func,
  removeGroup: PropTypes.func,
  setOriginSelectionMode: PropTypes.func,
  setDestinationSelectionMode: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    origins: originGroupsSelector(state),
    destinations: destinationGroupsSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setEditingGroup, removeGroup, setOriginSelectionMode, setDestinationSelectionMode
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZoneManagerContainer)
