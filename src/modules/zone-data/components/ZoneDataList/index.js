import React from 'react'
import styled from 'styled-components'
import ListSeparator from '../ListSeparator'
import HoveredZoneDataRowContainer from '../../containers/HoveredZoneDataRowContainer'
import OriginZonesDataRowsContainer from '../../containers/OriginZonesDataRowsContainer'
import DestinationZonesDataRowsContainer from '../../containers/DestinationZonesDataRowsContainer'

const List = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border-left: 1px solid ${({theme}) => theme.colors.borderSecondary};
  display: flex;
  flex-direction: column;
  padding: 0.3em;
  min-height: 100vh;
  width: 500px;
  transition: 0.2s all;
  background: white;
  z-index: 2;
`

class ZoneDataList extends React.Component {
  render () {
    return (
      <List>
        <HoveredZoneDataRowContainer />
        <ListSeparator>Origins</ListSeparator>
        <OriginZonesDataRowsContainer />
        <ListSeparator>Destinations</ListSeparator>
        <DestinationZonesDataRowsContainer />
      </List>
    )
  }
}

export default ZoneDataList
