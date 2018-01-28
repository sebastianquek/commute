import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { goToAnchor } from 'react-scrollable-anchor'
import ZoneManager from '../components/ZoneManager'
import SelectedZoneButton from '../components/SelectedZoneButton'
import { setOriginSelectionMode, setDestinationSelectionMode, removeGroup, setEditingGroupId, setEditSelectionMode } from '../actions'
import { originGroupsSelector, destinationGroupsSelector } from '../selectors'

const ZoneManagerContainer = (props) => {
  const initialIdx = props.origins.length
  return (
    <ZoneManager
      origins={props.origins && props.origins.map((group, idx) =>
        <SelectedZoneButton
          key={group.groupId}
          color={group.color}
          onClick={() => goToAnchor('' + group.groupId, false)}
          onClickEdit={() => {
            props.setEditingGroupId(group.groupId)
            props.setEditSelectionMode()
            goToAnchor('' + group.groupId, false)
          }}
          onClickDelete={() => props.removeGroup(group.groupId)}>
          {idx + 1}
        </SelectedZoneButton>
      )}
      destinations={props.destinations && props.destinations.map((group, idx) =>
        <SelectedZoneButton
          key={group.groupId}
          color={group.color}
          onClick={() => goToAnchor('' + group.groupId, false)}
          onClickEdit={() => {
            props.setEditingGroupId(group.groupId)
            props.setEditSelectionMode()
            goToAnchor('' + group.groupId, false)
          }}
          onClickDelete={() => props.removeGroup(group.groupId)}>
          {initialIdx + idx + 1}
        </SelectedZoneButton>
      )}
      setOriginSelectionMode={props.setOriginSelectionMode}
      setDestinationSelectionMode={props.setDestinationSelectionMode}
    />
  )
}

ZoneManagerContainer.propTypes = {
  origins: PropTypes.arrayOf(PropTypes.object),
  destinations: PropTypes.arrayOf(PropTypes.object),
  setEditingGroupId: PropTypes.func,
  removeGroup: PropTypes.func,
  setOriginSelectionMode: PropTypes.func,
  setDestinationSelectionMode: PropTypes.func,
  setEditSelectionMode: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    origins: originGroupsSelector(state),
    destinations: destinationGroupsSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setOriginSelectionMode,
  setDestinationSelectionMode,
  setEditSelectionMode,
  setEditingGroupId,
  removeGroup
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZoneManagerContainer)
