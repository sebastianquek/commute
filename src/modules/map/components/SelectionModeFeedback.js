import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fadeSlideDown } from '../../../utils/animations'
import ZoneButton from '../../core/components/ZoneButton'

const Wrapper = styled.div`
  padding: 1em 1.4em;
  background: white;
  border-radius: 0 0 ${({theme}) => `${theme.borderRadius} ${theme.borderRadius}`};
  position: fixed;
  left: 120px;
  display: flex;
  align-items: center;
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

const Meta = styled.div`
  font-weight: 400;
  font-size: 0.88em;
  display: flex;
  align-items: center;

  kbd {
    display: inline-block;
    margin: 0.3em 0.4em 0.3em 0.1em;
    padding: 0.16em 0.6em;
    font-family: Consolas, monospace;
    font-size: 0.86em;
    background-color: #e1e3e5;
    border: 1px solid #adb3b9;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(12,13,14,0.2), 0 0 0 2px #FFF inset;
    white-space: nowrap;
    line-height: 1.4;
  }
`

const Button = styled.button`
  cursor: pointer;
  font-family: inherit;
`

const SelectionModeFeedback = ({zoneSelectionMode, editingGroup, resetSelectionMode}) => {
  let feedback
  switch (zoneSelectionMode) {
    case 'origins':
      feedback = (
        <div>
          <span>Selecting origin zones</span>
          <Meta><kbd>Shift</kbd> + click to group zones</Meta>
        </div>
      )
      break
    case 'destinations':
      feedback = (
        <div>
          <span>Selecting destination zones</span>
          <Meta><kbd>Shift</kbd> + click to group zones</Meta>
        </div>
      )
      break
    case 'edit':
      feedback = (
        <span>
          <span style={{marginRight: '0.2em'}}>Editing</span>
          <ZoneButton hover={false} animate={false} color={editingGroup.color}>{editingGroup.groupId}</ZoneButton>
        </span>
      )
      break
    default:
      feedback = ''
  }

  return (
    <Wrapper>
      <Feedback>{feedback}</Feedback>
      <Button onClick={resetSelectionMode}>Done</Button>
    </Wrapper>
  )
}

SelectionModeFeedback.propTypes = {
  zoneSelectionMode: PropTypes.string,
  editingGroup: PropTypes.object,
  resetSelectionMode: PropTypes.func.isRequired
}

export default SelectionModeFeedback
