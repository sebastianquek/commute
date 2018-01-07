import React from 'react'
import PropTypes from 'prop-types'
import {VictoryChart, VictoryBrushContainer, VictoryTheme, VictoryArea, VictoryAxis} from 'victory'
import moment from 'moment'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
`
class DatetimeSlider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      data: [
        {x: new Date(2016, 9, 1), y: 125},
        {x: new Date(2016, 9, 3), y: 257},
        {x: new Date(2016, 9, 10), y: 345},
        {x: new Date(2016, 9, 20), y: 515},
        {x: new Date(2016, 9, 30), y: 132},
        {x: new Date(2016, 10, 15), y: 305},
        {x: new Date(2016, 10, 16), y: 270},
        {x: new Date(2016, 10, 26), y: 470}
      ]
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
      newDate.setHours(0)
      domain.x[i] = newDate
    }
    if (this.props.brushDomain.x[0].getTime() !== domain.x[0].getTime() ||
        this.props.brushDomain.x[1].getTime() !== domain.x[1].getTime()) {
      // this.setState({brushDomain: domain})
      this.props.setDatetimeBrushDomain(domain)
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   this.setState({brushDomain: nextProps.brushDomain})
  // }

  formatTimeAxisTick (time) {
    return moment(time).format('Do MMM YYYY')
  }

  render () {
    return (
      <Wrapper innerRef={ref => (this.ref = ref)}>
        <VictoryChart
          padding={{top: 16, bottom: 40, left: 60, right: 26}}
          width={this.state.width}
          height={this.state.height}
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryBrushContainer
              brushDomain={this.props.brushDomain}
              brushDimension="x"
              onBrushDomainChange={this.handleBrush}
            />
          }
        >
          <VictoryAxis
            dependentAxis
            label='Departures'
            style={{
              tickLabels: {fontFamily: `'Poppins', sans-serif`},
              axisLabel: {
                fontSize: '12px',
                padding: 45,
                fontFamily: `'Poppins', sans-serif`,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2.8px'
              }
            }}
          />
          <VictoryAxis
            tickFormat={this.formatTimeAxisTick}
            scale={{x: 'time'}}
            style={{tickLabels: {fontFamily: `'Poppins', sans-serif`}}}
          />
          <VictoryArea
            data={this.state.data}
            style={{ data: { fill: '#c43a31' } }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
          />
        </VictoryChart>
      </Wrapper>
    )
  }
}

DatetimeSlider.propTypes = {
  brushDomain: PropTypes.object,
  setDatetimeBrushDomain: PropTypes.func
}

export default DatetimeSlider
