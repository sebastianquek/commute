import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ZoneCategory from '../ZoneCategory'

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

const ZoneManager = (props) => {
  return (
    <Container>
      <ZoneCategory category="Origins">
        {props.originZones}
      </ZoneCategory>
      <ZoneCategory category="Destinations">
        {props.destinationZones}
      </ZoneCategory>
    </Container>
  )
}

ZoneManager.propTypes = {
  originZones: PropTypes.node,
  destinationZones: PropTypes.node
}

export default ZoneManager
