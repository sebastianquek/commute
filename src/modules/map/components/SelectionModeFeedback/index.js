import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fadeSlideDown } from '../../../../utils/animations'

const Wrapper = styled.div`
  padding: 1em 1.4em;
  background: white;
  border-radius: 0 0 ${({theme}) => `${theme.borderRadius} ${theme.borderRadius}`};
  position: fixed;
  left: 120px;
  display: flex;
  animation: ${fadeSlideDown} 0.7s;
  border: 1px solid ${({theme}) => theme.colors.borderSecondary};
  border-top: none;
`

const Feedback = styled.span`
  color: ${({theme}) => theme.colors.textPrimary};
  font-weight: bold;
  font-size: 1.2em;
  margin-right: 1em;
`

const Button = styled.button`
  cursor: pointer;
  font-family: inherit;
`

const SelectionModeFeedback = ({zoneSelectionMode, resetSelectionMode}) => {
  return (
    <Wrapper>
      <Feedback>{zoneSelectionMode === 'origins' ? 'Selecting origin zones' : 'Selecting destination zones'}</Feedback>
      <Button onClick={resetSelectionMode}>Done</Button>
    </Wrapper>
  )
}

SelectionModeFeedback.propTypes = {
  zoneSelectionMode: PropTypes.string,
  resetSelectionMode: PropTypes.func.isRequired
}

export default SelectionModeFeedback
