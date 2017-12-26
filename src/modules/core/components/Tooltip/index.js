import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div.attrs({
  style: ({x, y}) => ({
    top: `${y + 10}px`,
    left: `${x + 10}px`
  })
})`
  position: absolute;
  padding: 0.6em 0.8em;
  max-width: 200px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: ${({theme}) => theme.borderRadius};
  font-size: ${({theme}) => theme.typography.subHeaderSize};
  font-family: 'Barlow', sans-serif;
`

const Tooltip = (props) => {
  if (!props.x || !props.y) return null
  return (
    <Wrapper {...props}>
      {props.children}
    </Wrapper>
  )
}

Tooltip.propTypes = {
  children: PropTypes.node,
  x: PropTypes.number,
  y: PropTypes.number
}

export default Tooltip
