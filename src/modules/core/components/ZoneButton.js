import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { shouldTextBeDark } from '../../../utils/randomColor'
import { fadeSlideUpRotated } from '../../../utils/animations'

const ScaleWrapper = styled.div`
  display: inline-block;
  ${({small}) => small && css`transform: scale(0.6);`}
`

const Button = styled.button` 
  background-color: ${({color}) => color};
  border-radius: ${({circle, theme}) => circle ? '100%' : theme.borderRadius};
  border: 1px ${({dottedBorder}) => dottedBorder ? 'dashed' : 'solid'} ${({theme}) => theme.colors.borderPrimary};
  min-height: ${({circle}) => circle ? '2rem' : '1.7rem'};
  height: ${({circle}) => circle ? '2rem' : '1.7rem'};
  margin: ${({roundedSquare, circle}) => (roundedSquare || circle) && css`0.3rem`} 0.5rem;
  padding: 0;
  transition: 0.2s all;
  min-width: ${({circle}) => circle ? '2rem' : '1.7rem'};
  width: ${({circle}) => circle ? '2rem' : '1.7rem'};
  z-index: 2;

  ${({roundedSquare, circle}) => (!roundedSquare && !circle) && css`transform: rotate(45deg);`}
  ${({animate}) => animate && css`animation: ${fadeSlideUpRotated} 0.7s ease;`}
  
  ${({hover}) => hover && css`
    :hover {
      box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 10px 0;
      cursor: pointer;
      transform: ${({roundedSquare, circle}) => (!roundedSquare && !circle) && css`rotate(45deg)`} translate(-1px, -1px);
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
    <ScaleWrapper small={props.small}>
      <Button
        onClick={props.onClick}
        {...props}
        darkText={shouldTextBeDark(props.color)}
      >
        <span>{props.children}</span>
      </Button>
    </ScaleWrapper>
  )
}

ZoneButton.propTypes = {
  color: PropTypes.string,
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
