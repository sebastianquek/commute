import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import Subheader from '../../core/components/Subheader'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: picker;

  .DayPicker {
    background: transparent;
  }

  .DayPicker-wrapper {
    padding: 0;
  }
  
  .DayPicker-wrapper:focus {
    outline: none;
  }
  
  .DayPicker-NavButton {
    right: 0.8em;
  }

  .DayPicker-Caption {
    color: ${({theme}) => theme.colors.textPrimary};
    padding-left: 0;

    > div {
      font-weight: 700;
    }
  }

  .DayPicker-Month {
    margin: 0;
  }

  .DayPicker-Weekday, .DayPicker-Day {
    font-family: 'Barlow', sans-serif;
    font-size: 0.84em;
    padding: 0.3em 0.46em;
  }

  .DayPicker-Weekday {
    font-size: 0.7em;
  }

  .DayPicker-Day:not(.DayPicker-Day--outside) {
    border: 1px solid #eee;
    transition: all 0.3s;
  }

  .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover,
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    border-radius: 0;
  }

  .DayPicker-Day--brushed:hover {
    background-color: #51a0fa !important;
  }
`

class DatetimePicker extends React.Component {
  constructor (props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange (date, { disabled, selected }) {
    if (!disabled) {
      this.props.setStartDatetime(date)
      this.props.forceDatetimeSliderUpdate()
    }
  }

  render () {
    const modifiers = {
      zoomed: {
        from: this.props.zoomedDateDomain[0],
        to: this.props.zoomedDateDomain[1]
      },
      brushed: {
        from: this.props.brushedDateDomain[0],
        to: this.props.brushedDateDomain[1]
      }
    }

    const modifiersStyles = {
      zoomed: {
        color: '#4a90e2'
      },
      brushed: {
        color: 'white',
        backgroundColor: '#4a90e2'
      }
    }

    return (
      <Wrapper>
        <Subheader>Date</Subheader>
        <DayPicker
          month={this.props.brushedDateDomain[0]}
          fromMonth={this.props.minDate}
          toMonth={this.props.maxDate}
          disabledDays={{
            after: this.props.maxDate,
            before: this.props.minDate
          }}
          onDayClick={this.handleDateChange}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles} />
      </Wrapper>
    )
  }
}

DatetimePicker.propTypes = {
  brushedDateDomain: PropTypes.array.isRequired,
  zoomedDateDomain: PropTypes.array.isRequired,
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired,
  setStartDatetime: PropTypes.func.isRequired,
  forceDatetimeSliderUpdate: PropTypes.func
}

export default DatetimePicker
