import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { VictoryBar } from 'victory'
import Chart from './Chart'

class Charts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      departureData: {},
      arrivalData: {}
    }
  }

  componentDidMount () {
    this.props.fetchRidership()
  }

  componentWillReceiveProps (newProps) {
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
      [
        <Chart
          key='departures'
          width={this.props.width}
          height={this.props.height / 2}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          yLabel='Departures'>
          {departureCharts}
        </Chart>,
        <Chart
          key='arrivals'
          width={this.props.width}
          height={this.props.height / 2}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          yLabel='Arrivals'>
          {arrivalCharts}
        </Chart>
      ]
    )
  }
}

Charts.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired,
  step: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  zoneColors: PropTypes.object.isRequired,
  fetchRidership: PropTypes.func.isRequired
}

export default Charts
