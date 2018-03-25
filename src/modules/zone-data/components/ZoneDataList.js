import React from 'react'
import styled from 'styled-components'
import HoveredZoneDataRowContainer from '../containers/HoveredZoneDataRowContainer'
import OriginsDataRowsContainer from '../containers/OriginsDataRowsContainer'
import DestinationsDataRowsContainer from '../containers/DestinationsDataRowsContainer'

const List = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border-left: 1px solid ${({theme}) => theme.colors.borderSecondary};
  display: flex;
  flex-direction: column;
  padding: 0.3em 0.3em 0.3em 0.4em;
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
      <OriginsDataRowsContainer />
      <DestinationsDataRowsContainer />
    </List>
  )
}

export default ZoneDataList
