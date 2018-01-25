import React from 'react'
import styled from 'styled-components'
import HoveredZoneDataRowContainer from '../containers/HoveredZoneDataRowContainer'
import OriginZonesDataRowsContainer from '../containers/OriginZonesDataRowsContainer'
import DestinationZonesDataRowsContainer from '../containers/DestinationZonesDataRowsContainer'

const List = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border-left: 1px solid ${({theme}) => theme.colors.borderSecondary};
  display: flex;
  flex-direction: column;
  padding: 0.3em;
  min-height: 100vh;
  width: ${({theme}) => theme.dimensions.rightBarWidth};
  transition: 0.2s all;
  background: white;
  z-index: 2;
`

const ZoneDataList = (props) => {
  return (
    <List>
      <HoveredZoneDataRowContainer />
      <OriginZonesDataRowsContainer />
      <DestinationZonesDataRowsContainer />
    </List>
  )
}

export default ZoneDataList
