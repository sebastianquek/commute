import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { destinationGroupsCompositionDataSelector, destinationGroupsJourneyDataSelector } from '../selectors'
import zoneManager from '../../zone-manager'
import DestinationZonesDataRows from '../components/DestinationZonesDataRows'
import ListSeparator from '../components/ListSeparator'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const DestinationZonesDataRowsContainer = (props) => {
  return (
    <Wrapper>
      <ListSeparator>Destinations</ListSeparator>
      <DestinationZonesDataRows {...props} />
    </Wrapper>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    zoneCompositions: destinationGroupsCompositionDataSelector(state),
    zoneJourneys: destinationGroupsJourneyDataSelector(state),
    initialIdx: zoneManager.selectors.originGroupsSelector(state).length,
    ...ownProps
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DestinationZonesDataRowsContainer)
