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
      arrivalData: {},
      barWidth: 10
    }
  }

  componentDidMount () {
    this.props.fetchRidership()
  }

  componentWillReceiveProps (newProps) {
    const numKeysInNew = Object.keys(newProps.data).reduce((length, key) => length + Object.keys(newProps.data[key]).length, 0)
    const numKeysInOld = Object.keys(this.props.data).reduce((length, key) => length + Object.keys(this.props.data[key]).length, 0)

    // Set bar chart width based on zoom level
    if (this.props.step === newProps.step ||
      (this.props.step !== newProps.step && numKeysInOld !== numKeysInNew)) {
      const zoomDomainLength = moment(newProps.zoomDomain.x[1]).diff(moment(newProps.zoomDomain.x[0]))
      const stepMilliseconds = moment.duration(newProps.step).as('milliseconds')
      this.setState({barWidth: 0.8 * newProps.width / Math.floor(zoomDomainLength / stepMilliseconds)})
    }
    // Update ridership data if required
    if (
      numKeysInOld !== numKeysInNew ||
      this.props.minDate.getTime() !== newProps.minDate.getTime() ||
      this.props.maxDate.getTime() !== newProps.maxDate.getTime() ||
      this.props.step !== newProps.step
    ) {
      // const minDate = moment(newProps.minDate)
      // const maxDate = moment(newProps.maxDate)
      // const step = moment.duration(newProps.step)
      const allData = Object.keys(newProps.data).reduce((allData, id) => {
        // let departureData = []
        // let arrivalData = []
        const dataForZone = newProps.data[id]
        const ridershipData = Object.keys(dataForZone).reduce((obj, datetime) => {
          if (dataForZone[datetime].departure) {
            obj.departure.push({
              x: new Date(datetime),
              y: dataForZone[datetime].departure
            })
          }
          if (dataForZone[datetime].arrival) {
            obj.arrival.push({
              x: new Date(datetime),
              y: dataForZone[datetime].arrival
            })
          }
          return obj
        }, {departure: [], arrival: []})
        // for (let m = moment(minDate); m.isBefore(maxDate); m.add(step)) {
        //   let departure = 0
        //   let arrival = 0
        //   if (newProps.data[id][m.toISOString()]) {
        //     departure = newProps.data[id][m.toISOString()].departure || 0
        //     arrival = newProps.data[id][m.toISOString()].arrival || 0

        //     if (departure > 0) {
        //       departureData.push({
        //         x: m.toDate(),
        //         y: departure,
        //         width: 10
        //       })
        //     }
        //     if (arrival > 0) {
        //       arrivalData.push({
        //         x: m.toDate(),
        //         y: arrival,
        //         width: 10
        //       })
        //     }
        //   }
          // departureData.push({
          //   x: m.toDate(),
          //   y: departure
          // })
          // arrivalData.push({
          //   x: m.toDate(),
          //   y: arrival
          // })
        // }
        allData.departure[id] = ridershipData.departure
        allData.arrival[id] = ridershipData.arrival
        return allData
      }, {departure: {}, arrival: {}})
      this.setState({departureData: allData.departure, arrivalData: allData.arrival})
    }
  }

  render () {
    const zoomMinDate = moment(this.props.zoomDomain.x[0])
    const zoomMaxDate = moment(this.props.zoomDomain.x[1])
    const departureCharts = Object.keys(this.state.departureData)
      .reduce((components, id) => {
        const data = this.state.departureData[id].filter(row => moment(row.x.toISOString()).isBetween(zoomMinDate, zoomMaxDate, null, '[]'))
        components.push(
          <VictoryBar
            key={id}
            data={data}
            style={{data: {fill: this.props.zoneColors[id], strokeWidth: 0, width: this.state.barWidth}}}
            alignment='start'
          />
        )
        return components
      }, [])

    const arrivalCharts = Object.keys(this.state.arrivalData)
      .reduce((components, id) => {
        const data = this.state.arrivalData[id].filter(row => moment(row.x.toISOString()).isBetween(zoomMinDate, zoomMaxDate, null, '[]'))
        components.push(
          <VictoryBar
            key={id}
            data={data}
            y={d => d.y * -1}
            style={{data: {fill: this.props.zoneColors[id], strokeWidth: 0, width: this.state.barWidth}}}
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
          yLabel='Departures'
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          maxY={this.props.maxY}
          zoomDomain={this.props.zoomDomain}
          setDatetimeZoomDomain={this.props.setDatetimeZoomDomain}>
          {departureCharts}
        </Chart>,
        <Chart
          key='arrivals'
          width={this.props.width}
          height={this.props.height / 2}
          yLabel='Arrivals'
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          maxY={this.props.maxY}
          zoomDomain={this.props.zoomDomain}
          setDatetimeZoomDomain={this.props.setDatetimeZoomDomain}
          bottomChart={true}>
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
  zoomDomain: PropTypes.object.isRequired,
  maxY: PropTypes.number.isRequired,
  fetchRidership: PropTypes.func.isRequired,
  setDatetimeZoomDomain: PropTypes.func.isRequired
}

export default Charts
