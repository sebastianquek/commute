import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DatetimePickerContainer from '../../containers/DatetimePickerContainer'
import DatetimeSliderContainer from '../../containers/DatetimeSliderContainer'

const Wrapper = styled.div`
  height: 300px;
  z-index: 2;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 1.2em calc(500px + 1.2em) 1.2em 1.4em;
  border-top: 1px solid ${({theme}) => theme.colors.borderSecondary};
  display: flex;
  // align-items: center;
`

const DatetimeManager = () => {
  return (
    <Wrapper>
      <DatetimePickerContainer />
      <DatetimeSliderContainer />
    </Wrapper>
  )
}

DatetimeManager.propTypes = {

}

export default DatetimeManager
