import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import styled from 'styled-components'
import {DayPickerSingleDateController, DayPickerNavigation} from 'react-dates'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .DayPicker {
    left: -1.3em;
  }

  .CalendarMonth_caption {
    padding-top: 14px;
    padding-bottom: 34px;
  }

  .DayPickerNavigation_button__horizontal {
    top: 10px;
  }

  .DayPicker_weekHeader {
    top: 52px;
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
      focused: true,
      month: this.props.date.getMonth()
    }
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleFocusChange = this.handleFocusChange.bind(this)
    this.handleChangeMonthClick = this.handleChangeMonthClick.bind(this)
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

  handleDateChange (date) {
    this.props.setFirstDatetime(date.toDate())
  }

  handleFocusChange () {
    this.setState({focused: true})
  }

  componentDidMount () {
    const nav = ReactDom.findDOMNode(this).getElementsByClassName('DayPickerNavigation_button')
    this.prevMonthButton = nav[0]
    this.nextMonthButton = nav[1]
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.date.getTime() === this.props.date.getTime()) return
    const newMonth = nextProps.date.getMonth()
    const monthDiff = newMonth - this.state.month
    if (monthDiff > 0) {
      for (let i = 0; i < monthDiff; i++) this.nextMonthButton.click()
    } else if (monthDiff < 0) {
      for (let i = 0; i < Math.abs(monthDiff); i++) this.prevMonthButton.click()
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.date.getTime() === this.props.date.getTime()) {
      return false
    }
    return true
  }

  handleChangeMonthClick (newMonth) {
    this.setState({month: newMonth.month()})
  }

  render () {
    return (
      <Wrapper>
        <Header>Date</Header>
        <DayPickerSingleDateController
          date={moment(this.props.date)}
          onDateChange={this.handleDateChange}
          focused={this.state.focused}
          onFocusChange={this.handleFocusChange}
          hideKeyboardShortcutsPanel={true}
          numberOfMonths={1}
          daySize={28}
          noBorder={true}
          transitionDuration={100}
          initialVisibleMonth={() => moment(this.props.date)}
          isOutsideRange={day =>
            this.isBeforeDay(day, moment(this.props.firstDate)) ||
            !this.isBeforeDay(day, moment(this.props.lastDate))
          }
          renderMonth={month => moment(month).format('MMM YYYY')}
          onPrevMonthClick={this.handleChangeMonthClick}
          onNextMonthClick={this.handleChangeMonthClick}
        />
      </Wrapper>
    )
  }
}

DatetimePicker.propTypes = {
  date: PropTypes.object,
  firstDate: PropTypes.string,
  lastDate: PropTypes.string,
  setFirstDatetime: PropTypes.func
}

DatetimePicker.defaultProps = {
  firstDate: '20161001',
  lastDate: '20161127'
}

export default DatetimePicker
