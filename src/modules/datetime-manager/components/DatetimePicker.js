import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .DayPicker {
    margin-left: -1.5em;
    margin-right: 1.6em;
    margin-top: -0.6em;
    background: transparent;
  }

  .DayPicker-wrapper:focus {
    outline: none;
  }

  .DayPicker-NavButton {
    right: 0.8em;
  }

  .DayPicker-Caption {
    > div {
      font-weight: 700;
    }
  }

  .DayPicker-Weekday, .DayPicker-Day {
    padding: 0.3em 0.46em;
    font-size: 0.84em;
  }

  .DayPicker-Weekday {
    font-size: 0.7em;
  }

  .DayPicker-Day:not(.DayPicker-Day--outside) {
    border: 1px solid #eee;
  }

  .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover,
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    border-radius: 0;
    transition: all 0.1s;
  }

  .DayPicker-Day--brushed:hover {
    background-color: #51a0fa !important;
  }
`

const Header = styled.span`
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  font-weight: bold;
  font-size: ${({theme}) => theme.typography.subHeaderSize};
  color: ${({theme}) => theme.colors.textSecondary};
  text-transform: uppercase;
  margin-bottom: 0.18em;
`

class DatetimePicker extends React.Component {
  constructor (props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange (date, { disabled, selected }) {
    date.setHours(0)
    if (!disabled) this.props.setFirstDatetime(date)
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
        <Header>Date</Header>
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
  brushedDateDomain: PropTypes.array,
  zoomedDateDomain: PropTypes.array,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  setFirstDatetime: PropTypes.func
}

export default DatetimePicker
