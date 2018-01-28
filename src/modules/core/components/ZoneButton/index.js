import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { shouldTextBeDark } from '../../../../utils/randomColor'
import { fadeSlideUpRotated } from '../../../../utils/animations'

const Button = styled.button`
  border: 1px ${({dottedBorder}) => dottedBorder ? 'dashed' : 'solid'} ${({theme}) => theme.colors.borderPrimary};
  margin: 0.5rem;
  padding: 0;
  background-color: ${({color}) => color};
  transform: rotate(45deg);
  height: 1.7rem;
  width: 1.7rem;
  border-radius: ${({theme}) => theme.borderRadius};
  transition: 0.2s all;
 
  z-index: 2;

  ${({animate}) => animate && css`
    animation: ${fadeSlideUpRotated} 0.7s ease;
  `}
  
  ${({hover}) => hover && css`
    :hover {
      cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 10px 0;
      transform: rotate(45deg) translate(-1px, -1px);
    }
  `}

  > span {
    display: inline-block;
    transform: rotate(-45deg);
    color: ${({darkText, theme}) => darkText ? theme.colors.textPrimary : theme.colors.textSecondaryAlt};
    font-family: 'Barlow', sans-serif;
    font-weight: 600;
    font-size: 1rem;
  }

  :focus {
    outline: none;
  }
`

const ZoneButton = (props) => {
  return (
    <Button onClick={props.onClick} {...props} darkText={shouldTextBeDark(props.color)}>
      <span>{props.children}</span>
    </Button>
  )
}

ZoneButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  dottedBorder: PropTypes.bool,
  hover: PropTypes.bool,
  animate: PropTypes.bool,
  children: PropTypes.node
}

ZoneButton.defaultProps = {
  color: '#eee',
  dottedBorder: false,
  hover: true,
  animate: true
}

export default ZoneButton
