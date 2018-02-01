import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { destinationGroupsCompositionDataSelector, destinationGroupsJourneyDataSelector } from '../selectors'
import zoneManager from '../../zone-manager'
import SelectedZonesDataRows from '../components/SelectedZonesDataRows'
import ListSeparator from '../components/ListSeparator'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const DestinationsDataRowsContainer = (props) => {
  return (
    <Wrapper>
      <ListSeparator>Destinations</ListSeparator>
      <SelectedZonesDataRows {...props} category='destination' />
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
)(DestinationsDataRowsContainer)
