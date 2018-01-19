import React from 'react'
import { connect } from 'react-redux'
import { destinationZonesDataSelector, numOriginZonesSelector } from '../selectors'
import styled from 'styled-components'
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
    destinationZones: destinationZonesDataSelector(state),
    initialIdx: numOriginZonesSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DestinationZonesDataRowsContainer)
