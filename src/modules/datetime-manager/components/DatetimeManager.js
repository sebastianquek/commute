import React from 'react'
import styled from 'styled-components'
import DatetimePickerContainer from '../containers/DatetimePickerContainer'
import ControlsContainer from '../containers/ControlsContainer'
import DatetimeSliderContainer from '../containers/DatetimeSliderContainer'

const Wrapper = styled.div`
  align-items: start;
  background-color: white;
  border-top: 1px solid ${({theme}) => theme.colors.borderSecondary};
  bottom: 0;
  display: grid;
  grid-column-gap: 2em;
  grid-row-gap: 1.6em;
  grid-template-areas:
    'picker slider'
    'controls slider';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: ${({theme}) => theme.dimensions.bottomBarHeight};
  justify-items: start;
  left: 0;
  padding: 0.8em ${({theme}) => `calc(${theme.dimensions.rightBarWidth} + 0.5em)`} 0.8em 1.2em;
  position: fixed;
  width: 100%;
  z-index: 2;
`

const DatetimeManager = () => {
  return (
    <Wrapper>
      <DatetimePickerContainer />
      <ControlsContainer />
      <DatetimeSliderContainer />
    </Wrapper>
  )
}

export default DatetimeManager
