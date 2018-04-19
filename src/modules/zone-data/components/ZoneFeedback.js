import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {fadeSlideUp} from '../../../utils/animations'

const FeedbackLabel = styled.div`
  align-items: center;
  animation: ${fadeSlideUp} 0.7s ease;
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  font-size: 1rem;
  font-style: italic;
  height: 100px;
  justify-content: center;
  margin: -112px 0 1em 0;
  padding: 0 2.5em;
  text-align: center;
`

const FadedZoneDataContainer = styled.div`
  opacity: 0.15;
  pointer-events: none;
`

// Zone data container without data but with feedback text
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
