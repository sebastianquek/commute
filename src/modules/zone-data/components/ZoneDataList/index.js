import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ZoneDataRow from '../ZoneDataRow'
import ZoneFeedback from '../ZoneFeedback'
import ListSeparator from '../ListSeparator'

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
`

const ZoneDataList = ({
  hoveredZoneData,
  originZonesData,
  destinationZonesData
}) => {
  return (
    <List>
      {hoveredZoneData ||
        <ZoneFeedback
          zoneDataContainer={<ZoneDataRow dottedBorder />}
          feedback='Hover over a zone to see its land use' />}
      <ListSeparator>Origins</ListSeparator>
      {originZonesData}
      <ListSeparator>Destinations</ListSeparator>
      {destinationZonesData}
      {(!originZonesData && !destinationZonesData) &&
        <ZoneFeedback
          zoneDataContainer={<ZoneDataRow />}
          feedback='Select an origin or destination zone to see more details' />}
    </List>
  )
}

ZoneDataList.propTypes = {
  hoveredZoneData: PropTypes.node,
  originZonesData: PropTypes.node,
  destinationZonesData: PropTypes.node
}

export default ZoneDataList
