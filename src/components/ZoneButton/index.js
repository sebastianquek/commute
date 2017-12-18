import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {fadeSlideUpRotated} from '../../animations'

const Button = styled.button`
  cursor: pointer;
  border: 1px ${({dottedBorder}) => dottedBorder ? 'dashed' : 'solid'} ${({theme}) => theme.colors.borderPrimary};
  margin: 0.4em;
  padding: 0;
  background-color: ${({color}) => color};
  transform: rotate(45deg);
  height: 1.5em;
  width: 1.5em;
  border-radius: ${({theme}) => theme.borderRadius};
  transition: 0.2s all;
  font-family: inherit;
  font-weight: bold;
  z-index: 2;
  animation: ${fadeSlideUpRotated} 0.7s ease;
  
  :hover {
    box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 10px 0;
    transform: rotate(45deg) translate(-1px, -1px);
  }

  > span {
    display: inline-block;
    transform: rotate(-45deg);
    color: ${({theme}) => theme.colors.textPrimary};
    font-size: 0.9em;
  }

  :focus {
    outline: none;
  }
`

const ZoneButton = (props) => {
  return (
    <Button onClick={props.onClick} {...props}>
      <span>{props.children}</span>
    </Button>
  )
}

ZoneButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  dottedBorder: PropTypes.bool,
  children: PropTypes.node
}

ZoneButton.defaultProps = {
  color: '#eee',
  dottedBorder: false
}

export default ZoneButton
