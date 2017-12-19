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

const ZoneManager = ({
  origins,
  destinations,
  setOriginSelectionMode,
  setDestinationSelectionMode
}) => {
  return (
    <Container>
      <ZoneCategory onClickAdd={setOriginSelectionMode} category="Origins">
        {origins}
      </ZoneCategory>
      <ZoneCategory onClickAdd={setDestinationSelectionMode} category="Destinations">
        {destinations}
      </ZoneCategory>
    </Container>
  )
}

ZoneManager.propTypes = {
  origins: PropTypes.node,
  destinations: PropTypes.node,
  setOriginSelectionMode: PropTypes.func,
  setDestinationSelectionMode: PropTypes.func
}

export default ZoneManager
