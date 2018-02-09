import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import { scaleLinear } from 'd3-scale'
import { VictoryAxis, VictoryChart, VictoryZoomContainer, VictoryStack, VictoryBar, VictoryLabel } from 'victory'

momentDurationFormatSetup(moment)

class RouteChoiceChart extends React.Component {
  constructor (props) {
    super(props)
    this.barThickness = 38
    this.startZoomDomainSeconds = 3600
    this.leftPadding = 120
    this.rightPadding = 10
    this.labelYOffset = -16
    this.labelFontStyles = { fontFamily: `'Source Sans Pro', sans-serif`, fontSize: '15px' }
    this.state = {
      scale: scaleLinear()
        .domain([0, this.startZoomDomainSeconds])
        .range([0, 450 - this.leftPadding - this.rightPadding]),
      showSeconds: false
    }
    this.handleDomainChange = this.handleDomainChange.bind(this)
  }

  handleDomainChange (domain, props) {
    if (domain.x[0] < 0) domain.x[0] = 0
    const seconds = Math.floor(domain.x[1] - domain.x[0])
    if (this.state.zoomDomainSeconds !== seconds) {
      const scale = props.scale.x
        .domain(domain.x)
        .range([0, props.width - this.leftPadding - this.rightPadding])
      this.setState({
        scale,
        zoomDomainSeconds: seconds,
        showSeconds: seconds <= 320
      })
    }
  }

  render () {
    const keyArray = this.props.keys.map(({key}) => key)
    return (
      <VictoryChart
        height={(this.props.keys.length + 1) * this.barThickness + 110}
        horizontal={true}
        domainPadding={{ y: [this.barThickness, this.barThickness / 2] }}
        padding={{ top: 10, right: this.rightPadding, bottom: 50, left: this.leftPadding }}
        containerComponent={
          <VictoryZoomContainer
            zoomDomain={{y: [0, this.props.keys.length + 1]}}
            zoomDimension='x'
            minimumZoom={{x: 180}}
            onZoomDomainChange={(domain, props) => this.handleDomainChange(domain, props)}
          />
        }
      >
        <VictoryStack colorScale={'blue'}
          style={{ labels: { fill: 'white', ...this.labelFontStyles } }}
          labelComponent={ <VictoryLabel dx={this.labelYOffset} textAnchor='end' /> }
        >
          {this.props.data.map((data, index) => {
            return (
              <VictoryBar
                key={index}
                horizontal={true}
                categories={{ y: keyArray }}
                barRatio={0.8}
                data={this.props.keys.map(k => ({...k, width: this.barThickness}))}
                y={({key}) => data[key] ? data[key].duration : 0}
                x={({key}) => key}
                labels={({key, y}) => {
                  if (data[key]) {
                    const bus = data[key].bus
                    const estimatedWidth = bus.length * 6
                    const barWidth = this.state.scale(y) - this.state.scale(0) + this.labelYOffset
                    return barWidth > estimatedWidth ? bus : ''
                  }
                  return ''
                }}
              />
            )
          })}
        </VictoryStack>
        <VictoryAxis
          tickFormat={t => moment.duration(t, 'seconds')
            .format(this.state.showSeconds ? 'h[hrs] m[min] s[sec]' : 'h[hrs] m[min]', {
              trim: 'both'
            }).replace(' ', '\n')}
          style={{
            axis: {stroke: 'black'},
            grid: {stroke: 'grey', strokeWidth: '1px', opacity: 0.6},
            ticks: {stroke: 'grey', size: 5},
            tickLabels: this.labelFontStyles
          }}
        />
        <VictoryAxis
          dependentAxis
          tickLabelComponent={<VictoryLabel lineHeight={1.1}/>}
          tickFormat={b => {
            let [ originZone, destZone, buses ] = b.split('-')
            buses = buses.split(',').map(bus => bus.slice(0, -3))
            return `Zone ${originZone} to ${destZone}\n${buses.join(' ⇢ ')}`
          }}
          style={{ tickLabels: this.labelFontStyles }}
        />
      </VictoryChart>
    )
  }
}

RouteChoiceChart.propTypes = {
  data: PropTypes.array,
  keys: PropTypes.array
}

export default RouteChoiceChart
