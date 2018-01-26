import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { originGroupsCompositionDataSelector, originGroupsJourneyDataSelector } from '../selectors'
import OriginZonesDataRows from '../components/OriginZonesDataRows'
import ListSeparator from '../components/ListSeparator'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const OriginZonesDataRowsContainer = (props) => {
  return (
    <Wrapper>
      <ListSeparator>Origins</ListSeparator>
      <OriginZonesDataRows {...props} />
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
)(OriginZonesDataRowsContainer)
