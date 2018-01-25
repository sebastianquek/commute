import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ZoneCategory from '../ZoneCategory'

const AbsoluteWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`

const FixedWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: ${({theme}) => theme.dimensions.bottomBarHeight};
  border-right: 1px solid ${({theme}) => theme.colors.borderSecondary};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.8em 0.6em 0.8em 0.6em;
  transition: 0.2s all;
  background: white;
  overflow-y: auto;
  overflow-x: hidden;

  * {
    flex-shrink: 0;
  }
`

const ZoneManager = ({
  origins,
  destinations,
  setOriginSelectionMode,
  setDestinationSelectionMode
}) => {
  return (
    <AbsoluteWrapper>
      <FixedWrapper>
        <ZoneCategory onClickAdd={setOriginSelectionMode} category="Origins">
          {origins}
        </ZoneCategory>
        <ZoneCategory onClickAdd={setDestinationSelectionMode} category="Destinations">
          {destinations}
        </ZoneCategory>
      </FixedWrapper>
    </AbsoluteWrapper>
  )
}

ZoneManager.propTypes = {
  origins: PropTypes.node,
  destinations: PropTypes.node,
  setOriginSelectionMode: PropTypes.func,
  setDestinationSelectionMode: PropTypes.func
}

export default ZoneManager
