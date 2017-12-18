import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ZonesPanel from '../ZonesPanel'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-right: 1px solid ${({theme}) => theme.colors.borderSecondary};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.8em 0.3em 0 0.6em;
  height: 100%;
  transition: 0.2s all;
`

const LeftSidebar = (props) => {
  return (
    <Container>
      <ZonesPanel label="Origins">
        {props.originZones}
      </ZonesPanel>
      <ZonesPanel label="Destinations">
        {props.destinationZones}
      </ZonesPanel>
    </Container>
  )
}

LeftSidebar.propTypes = {
  originZones: PropTypes.node,
  destinationZones: PropTypes.node
}

export default LeftSidebar
