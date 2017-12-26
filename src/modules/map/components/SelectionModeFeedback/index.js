import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 1em 1.4em;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0 0 ${({theme}) => theme.borderRadius} 0;
  position: absolute;
  display: flex;
`

const Feedback = styled.span`
  color: white;
  margin-right: 1em;
`

const Button = styled.button`
  cursor: pointer;
  font-family: inherit;
`

const SelectionModeFeedback = ({selectionMode, onClick}) => {
  return (
    <Wrapper>
      <Feedback>{selectionMode === 'origin' ? 'Selecting origin zones' : 'Selecting destination zones'}</Feedback>
      <Button onClick={onClick}>Done</Button>
    </Wrapper>
  )
}

SelectionModeFeedback.propTypes = {
  selectionMode: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SelectionModeFeedback
