import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {fadeSlideUp} from '../../../utils/animations'

const FeedbackLabel = styled.div`
  font-size: ${({theme}) => theme.typography.bodySize};
  color: ${({theme}) => theme.colors.textPrimary};
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

const FadedZoneDataContainer = styled.div`
  opacity: 0.15;
  pointer-events: none;
`

const ZoneFeedback = ({zoneDataContainer, feedback}) => {
  return (
    <React.Fragment>
      <FadedZoneDataContainer>
        {zoneDataContainer}
      </FadedZoneDataContainer>
      <FeedbackLabel>
        {feedback}
      </FeedbackLabel>
    </React.Fragment>
  )
}

ZoneFeedback.propTypes = {
  zoneDataContainer: PropTypes.node,
  feedback: PropTypes.string
}

export default ZoneFeedback
