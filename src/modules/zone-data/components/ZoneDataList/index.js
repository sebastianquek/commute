import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ZoneDataContainer from '../ZoneDataContainer'
import ZoneFeedback from '../ZoneFeedback'

const List = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border-left: 1px solid ${({theme}) => theme.colors.borderSecondary};
  display: flex;
  flex-direction: column;
  padding: 0.3em;
  height: 100%;
  width: 500px;
  transition: 0.2s all;
`

const ZoneDataList = (props) => {
  return (
    <List>
      {props.hoveredZoneData || <ZoneFeedback zoneDataContainer={<ZoneDataContainer dottedBorder />} feedback='Hover over a zone to see its land use' />}
      {props.originZonesData}
      {props.destinationZonesData}
      {(!props.originZonesData && !props.destinationZonesData) && <ZoneFeedback zoneDataContainer={<ZoneDataContainer />} feedback='Select an origin or destination zone to see more details' />}
    </List>
  )
}

ZoneDataList.propTypes = {

}

export default ZoneDataList
