import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import styled from 'styled-components'
import {SingleDatePicker} from 'react-dates'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .SingleDatePickerInput, .DateInput, .DateInput_input {
    background-color: ${({theme}) => theme.colors.buttonBackground};
    border-radius: ${({theme}) => theme.borderRadius};
    border-bottom: none;
    font: inherit;
  }

  .DateInput {
    font-size: 0.9em;
    width: 22ch;
    &:before {
      content: '▼';
      position: absolute;
      top: 10px;
      right: 10px;
      color: ${({theme}) => theme.colors.textSecondary};
      transform: scale(1.2, 0.6);
      pointer-events: none;
    }
  }

  .DateInput_input {
    padding: 0.6em;
    font-weight: bold;
    cursor: pointer;
  }

  .DateInput_input__focused {
    border-bottom: none;
  }

  .SingleDatePicker_picker {
    transform: translate(0, -10px);
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
    this.state = {
      date: moment(props.firstDate),
      focused: false
    }
  }

  isBeforeDay (a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false
    const aYear = a.year()
    const aMonth = a.month()
    const bYear = b.year()
    const bMonth = b.month()
    const isSameYear = aYear === bYear
    const isSameMonth = aMonth === bMonth
    if (isSameYear && isSameMonth) return a.date() < b.date()
    if (isSameYear) return aMonth < bMonth
    return aYear < bYear
  }

  render () {
    return (
      <Wrapper>
        <Header>Date</Header>
        <SingleDatePicker
          date={this.state.date}
          onDateChange={date => this.setState({date})}
          focused={this.state.focused}
          onFocusChange={({focused}) => this.setState({focused})}
          displayFormat='dddd Do MMM'
          hideKeyboardShortcutsPanel={true}
          numberOfMonths={1}
          verticalSpacing={0}
          daySize={30}
          noBorder={true}
          transitionDuration={100}
          placeholder='Select a date'
          initialVisibleMonth={() => moment(this.props.firstDate)}
          isOutsideRange={day =>
            this.isBeforeDay(day, moment(this.props.firstDate)) ||
            !this.isBeforeDay(day, moment(this.props.lastDate))
          }
          renderMonth={month => moment(month).format('MMM YYYY')}
          readOnly
        />
      </Wrapper>
    )
  }
}

DatetimePicker.propTypes = {
  firstDate: PropTypes.string,
  lastDate: PropTypes.string
}

DatetimePicker.defaultProps = {
  firstDate: '20161001',
  lastDate: '20161127'
}

export default DatetimePicker
