import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ZoneDataContainer from '../ZoneDataContainer'
import {fadeSlideUp} from '../../animations'

const Container = styled.div`
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

const FeedbackLabel = styled.div`
  font-size: ${({theme}) => theme.typography.bodySize};  
  font-style: italic;
  text-align: center;
  padding: 0 2.5em;
  height: 100px;
  margin: -112px 0 1em 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeSlideUp} 0.7s ease;
`

const FadedZoneDataContainer = styled(ZoneDataContainer)`
  opacity: 0.15;
  height: 100px;
  pointer-events: none;
`

const RightSidebar = (props) => {
  return (
    <Container>
      {props.hoveredZoneData || <React.Fragment><FadedZoneDataContainer dottedBorder></FadedZoneDataContainer><FeedbackLabel>Hover over a zone to see its land use</FeedbackLabel></React.Fragment>}
      {props.originZonesData}
      {props.destinationZonesData}
      {(!props.originZonesData && !props.destinationZonesData) && <React.Fragment><FadedZoneDataContainer /><FeedbackLabel>Select an origin or destination zone to see more details</FeedbackLabel></React.Fragment>}
    </Container>
  )
}

RightSidebar.propTypes = {

}

export default RightSidebar
