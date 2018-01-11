import React from 'react'
import PropTypes from 'prop-types'
import { VictoryBar } from 'victory'
import moment from 'moment'
import styled from 'styled-components'
import isEqual from 'lodash.isequal'
import BrushedChartWrapper from '../BrushedChartWrapper'

const Wrapper = styled.div`
  width: 100%;
`

class DatetimeSlider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      departureData: {},
      arrivalData: {}
    }
    this.updateDimensions = this.updateDimensions.bind(this)
    this.handleBrush = this.handleBrush.bind(this)
  }

  updateDimensions () {
    this.setState({
      width: this.ref.getBoundingClientRect().width,
      height: this.ref.getBoundingClientRect().height
    })
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)
    this.updateDimensions()
    this.props.fetchRidership()
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
  }

  componentWillReceiveProps (newProps) {
    if (!isEqual(this.props.data, newProps.data) ||
        this.props.minDate.getTime() !== newProps.minDate.getTime() ||
        this.props.maxDate.getTime() !== newProps.maxDate.getTime()) {
      const minDate = moment(newProps.minDate)
      const maxDate = moment(newProps.maxDate)
      const step = moment.duration(newProps.step)
      const allData = Object.keys(newProps.data).reduce((allData, id) => {
        let departureData = []
        let arrivalData = []
        for (let m = moment(minDate); m.isBefore(maxDate); m.add(step)) {
          let departure = 0
          let arrival = 0
          if (newProps.data[id][m.toISOString()]) {
            departure = newProps.data[id][m.toISOString()].departure || 0
            arrival = newProps.data[id][m.toISOString()].arrival || 0
          }
          departureData.push({
            x: m.toDate(),
            y: departure
          })
          arrivalData.push({
            x: m.toDate(),
            y: arrival
          })
        }
        allData.departure[id] = departureData
        allData.arrival[id] = arrivalData
        return allData
      }, {departure: {}, arrival: {}})
      this.setState({departureData: allData.departure, arrivalData: allData.arrival})
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  handleBrush (domain) {
    for (let i = 0; i < 2; i++) {
      const newDate = new Date(domain.x[i])
      newDate.setMilliseconds(0)
      newDate.setSeconds(0)
      newDate.setMinutes(0)
      domain.x[i] = newDate
    }
    if (this.props.brushDomain.x[0].getTime() !== domain.x[0].getTime() ||
        this.props.brushDomain.x[1].getTime() !== domain.x[1].getTime()) {
      this.props.setDatetimeBrushDomain(domain)
    }
  }

  render () {
    const departureCharts = Object.keys(this.state.departureData).reduce((components, id) => {
      components.push(
        <VictoryBar
          key={id}
          data={this.state.departureData[id]}
          style={{data: {fill: this.props.zoneColors[id], strokeWidth: 0}}}
          barRatio={1}
          alignment='start'
        />
      )
      return components
    }, [])

    const arrivalCharts = Object.keys(this.state.arrivalData).reduce((components, id) => {
      components.push(
        <VictoryBar
          key={id}
          data={this.state.arrivalData[id]}
          style={{data: {fill: this.props.zoneColors[id], strokeWidth: 0}}}
          barRatio={1}
          alignment='start'
        />
      )
      return components
    }, [])

    return (
      <Wrapper innerRef={ref => (this.ref = ref)}>
        <BrushedChartWrapper
          width={this.state.width}
          height={this.state.height / 2}
          brushDomain={this.props.brushDomain}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          handleBrush={this.handleBrush}
          yLabel='Departures'>
          {departureCharts}
        </BrushedChartWrapper>
        <BrushedChartWrapper
          width={this.state.width}
          height={this.state.height / 2}
          brushDomain={this.props.brushDomain}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          handleBrush={this.handleBrush}
          yLabel='Arrivals'>
          {arrivalCharts}
        </BrushedChartWrapper>
      </Wrapper>
    )
  }
}

DatetimeSlider.propTypes = {
  brushDomain: PropTypes.object,
  data: PropTypes.object,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  step: PropTypes.string,
  zoneColors: PropTypes.object,
  setDatetimeBrushDomain: PropTypes.func,
  fetchRidership: PropTypes.func
}

DatetimeSlider.defaultProps = {
  data: {}
}

export default DatetimeSlider
