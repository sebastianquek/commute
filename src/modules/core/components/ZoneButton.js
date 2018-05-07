import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { shouldTextBeDark } from '../../../utils/randomColor'
import { fadeSlideUp, fadeSlideUpRotated } from '../../../utils/animations'

const Button = styled.button` 
  background-color: ${({color}) => color};
  border-radius: ${({circle, theme}) => circle ? '100%' : theme.borderRadius};
  border: ${({borderWidth}) => borderWidth || '1px'} ${({dottedBorder}) => dottedBorder ? 'dashed' : 'solid'} ${({borderColor, theme}) => borderColor || theme.colors.borderPrimary};
  min-height: ${({roundedSquare, circle}) => (roundedSquare || circle) ? '2rem' : '1.7rem'};
  height: ${({roundedSquare, circle}) => (roundedSquare || circle) ? '2rem' : '1.7rem'};
  margin: ${({roundedSquare, circle}) => (roundedSquare || circle) && css`0.3rem`} 0.5rem;
  padding: 0;
  transition: 0.2s all;
  min-width: ${({roundedSquare, circle}) => (roundedSquare || circle) ? '2rem' : '1.7rem'};
  width: ${({roundedSquare, circle}) => (roundedSquare || circle) ? '2rem' : '1.7rem'};
  z-index: 2;

  ${({roundedSquare, circle, small}) => {
    if (!roundedSquare && !circle) {
      return css`transform: rotate(45deg) ${small && 'scale(0.6)'};`
    } else {
      return css`transform: ${small && 'scale(0.6)'};`
    }
  }}
  ${({animate, roundedSquare, circle}) => {
    if (animate) {
      if (roundedSquare || circle) {
        return css`animation: ${fadeSlideUp} 0.7s ease;`
      } else {
        return css`animation: ${fadeSlideUpRotated} 0.7s ease;`
      }
    }
  }}
  
  ${({hover}) => hover && css`
    :hover {
      box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 10px 0;
      cursor: pointer;
    ${({roundedSquare, circle, small}) => {
    if (!roundedSquare && !circle) {
      return css`transform: rotate(45deg) ${small && 'scale(0.6)'} translate(-1px, -1px);`
    } else {
      return css`transform: ${small && 'scale(0.6)'} translate(-1px, -1px);`
    }
  }}
    }
    `}

  > span {
    color: ${({darkText, theme}) => darkText ? theme.colors.textPrimary : theme.colors.textSecondaryAlt};
    display: inline-block;
    font-family: 'Barlow', sans-serif;
    font-size: 1rem;
    font-weight: 600;

  ${({roundedSquare, circle}) => (!roundedSquare && !circle) && css`transform: rotate(-45deg);`}
  }

  :focus {
    outline: none;
  }
  `

const ZoneButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      {...props}
      darkText={shouldTextBeDark(props.color)}
    >
      <span>{props.children}</span>
    </Button>
  )
}

ZoneButton.propTypes = {
  color: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.string,
  onClick: PropTypes.func,
  dottedBorder: PropTypes.bool,
  hover: PropTypes.bool,
  animate: PropTypes.bool,
  small: PropTypes.bool,
  children: PropTypes.node
}

ZoneButton.defaultProps = {
  color: '#eee',
  dottedBorder: false,
  hover: true,
  animate: true,
  circle: false,
  roundedSquare: false,
  small: false
}

export default ZoneButton
