import React from 'react'
import styled from 'styled-components'
import DatetimePickerContainer from '../containers/DatetimePickerContainer'
import ControlsContainer from '../containers/ControlsContainer'
import DatetimeSliderContainer from '../containers/DatetimeSliderContainer'

const Wrapper = styled.div`
  height: ${({theme}) => theme.dimensions.bottomBarHeight};
  z-index: 2;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 0.8em ${({theme}) => `calc(${theme.dimensions.rightBarWidth} + 0.5em)`} 0.8em 1.2em;
  border-top: 1px solid ${({theme}) => theme.colors.borderSecondary};
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'picker slider'
    'controls slider';
  justify-items: start;
  align-items: start;
  grid-row-gap: 1.6em;
  grid-column-gap: 2em;
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
