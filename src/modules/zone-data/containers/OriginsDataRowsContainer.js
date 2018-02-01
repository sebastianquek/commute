import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { originGroupsCompositionDataSelector, originGroupsJourneyDataSelector } from '../selectors'
import SelectedZonesDataRows from '../components/SelectedZonesDataRows'
import ListSeparator from '../components/ListSeparator'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const OriginsDataRowsContainer = (props) => {
  return (
    <Wrapper>
      <ListSeparator>Origins</ListSeparator>
      <SelectedZonesDataRows {...props} category='origin' />
    </Wrapper>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    zoneCompositions: originGroupsCompositionDataSelector(state),
    zoneJourneys: originGroupsJourneyDataSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OriginsDataRowsContainer)
