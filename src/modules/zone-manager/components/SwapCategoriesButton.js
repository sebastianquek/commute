import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fadeSlideUp } from '../../../utils/animations'
const Button = styled.div`
  display: flex;
  justify-content: center;
  width: 5.5rem;
  margin: -1em 0 1em -0.6em;
  animation: ${fadeSlideUp} 0.7s ease;
  cursor: pointer;
  
  svg {
    fill: ${({theme}) => theme.colors.textSecondary};
    width: 2rem;
    height: 2rem;
  }

  &:hover {
    svg {
      fill: #4a90e2;
    }
  }
`
const SwapCategoriesButton = ({ swap }) => {
  return (
    <Button onClick={swap} title="Swap Origins and Destinations">
      <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M 6.5 0L 7.14018 -0.768221C 6.76934 -1.07726 6.23066 -1.07726 5.85982 -0.768221L 6.5 0ZM 7.5 13L 7.5 0L 5.5 0L 5.5 13L 7.5 13ZM 5.85982 -0.768221L -0.640184 4.64845L 0.640184 6.18489L 7.14018 0.768221L 5.85982 -0.768221ZM 5.85982 0.768221L 12.3598 6.18489L 13.6402 4.64845L 7.14018 -0.768221L 5.85982 0.768221Z" transform="translate(2 9)"/>
        <path d="M 6.5 0L 7.14018 -0.768221C 6.76934 -1.07726 6.23066 -1.07726 5.85982 -0.768221L 6.5 0ZM 7.5 13L 7.5 0L 5.5 0L 5.5 13L 7.5 13ZM 5.85982 -0.768221L -0.640184 4.64845L 0.640184 6.18489L 7.14018 0.768221L 5.85982 -0.768221ZM 5.85982 0.768221L 12.3598 6.18489L 13.6402 4.64845L 7.14018 -0.768221L 5.85982 0.768221Z" transform="matrix(-1 -8.74228e-08 8.74228e-08 -1 30 22)"/>
      </svg>
    </Button>
  )
}

SwapCategoriesButton.propTypes = {
  swap: PropTypes.func.isRequired
}

export default SwapCategoriesButton
