import React from 'react'
import styled from 'styled-components'
import DatetimePickerContainer from '../containers/DatetimePickerContainer'
import DatetimeSlider from '../components/DatetimeSlider'
import ControlsContainer from '../containers/ControlsContainer'

const Wrapper = styled.div`
  height: 380px;
  z-index: 2;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 0.8em calc(500px + 0.5em) 0.8em 1.2em;
  border-top: 1px solid ${({theme}) => theme.colors.borderSecondary};
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'picker slider'
    'controls slider';
  justify-items: start;
  align-items: start;
`

const DatetimeManager = () => {
  return (
    <Wrapper>
      <DatetimePickerContainer />
      <ControlsContainer />
      <DatetimeSlider />
    </Wrapper>
  )
}

export default DatetimeManager
