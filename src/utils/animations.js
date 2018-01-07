import { keyframes } from 'styled-components'

export const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(0, 2em);
  }

  to {
    transform: translate(0, 0);
  }
`

export const fadeSlideDown = keyframes`
  from {
    opacity: 0;
    transform: translate(0, -2em);
  }

  to {
    transform: translate(0, 0);
  }
`

export const fadeSlideLeft = keyframes`
  from {
    opacity: 0;
    transform: translate(2em, 0);
  }

  to {
    transform: translate(0, 0);
  }
`

export const fadeSlideRight = keyframes`
  from {
    opacity: 0;
    transform: translate(-2em, 0);
  }

  to {
    transform: translate(0, 0);
  }
`

export const fadeSlideUpRotated = keyframes`
  from {
    opacity: 0;
    transform: rotate(45deg) translate(2em, 2em);
  }

  to {
    transform: rotate(45deg) translate(0, 0);
  }
`
