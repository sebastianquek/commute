import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import styled from 'styled-components'
import { scaleLinear } from 'd3-scale'
import { VictoryAxis, VictoryChart, VictoryZoomContainer, VictoryStack, VictoryBar, VictoryLabel } from 'victory'
import theme from '../../../utils/theme'

momentDurationFormatSetup(moment)

const ChartWrapper = styled.div`
  display: flex;
`

class RouteChoiceChart extends React.Component {
  constructor (props) {
    super(props)
    this.barThickness = theme.typography.baseSize * theme.typography.chartAxisTicksRemRatio * 2
    this.startZoomDomainSeconds = 3600
    this.topPadding = theme.typography.baseSize * theme.typography.chartAxisLabelRemRatio * 2.5
    this.leftPadding = theme.typography.baseSize * theme.typography.chartAxisTicksRemRatio * 9
    this.rightPadding = 10
    this.labelYOffset = -16
    this.labelFontStyles = { fontFamily: `'Source Sans Pro', sans-serif`, fontSize: `${theme.typography.baseSize * theme.typography.chartAxisTicksRemRatio}px` }
    this.chartTitleFontStyles = { fontFamily: `'Poppins', sans-serif`, fontSize: `${theme.typography.baseSize * theme.typography.chartAxisLabelRemRatio}px`, fontWeight: 'bold' }
    this.state = {
      scale: x => x,
      showSeconds: false,
      width: 0
    }
    this.updateDimensions = this.updateDimensions.bind(this)
    this.handleDomainChange = this.handleDomainChange.bind(this)
  }

  updateDimensions () {
    this.setState({
      width: this.ref.getBoundingClientRect().width
    })
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)
    this.updateDimensions()
    this.setState({
      scale: scaleLinear()
        .domain([0, this.startZoomDomainSeconds])
        .range([0, this.ref.getBoundingClientRect().width / 3 * 2 - this.leftPadding - this.rightPadding])
    })
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
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
      <ChartWrapper innerRef={ref => (this.ref = ref)}>
        <VictoryChart
          height={(this.props.keys.length + 1) * this.barThickness + 110}
          width={this.state.width / 3 * 2}
          horizontal={true}
          domainPadding={{ y: [this.barThickness, this.barThickness / 2] }}
          padding={{ top: this.topPadding, right: this.rightPadding, bottom: 50, left: this.leftPadding }}
          containerComponent={
            <VictoryZoomContainer
              responsive={false}
              zoomDomain={{y: [0, this.props.keys.length + 1]}}
              zoomDimension='x'
              minimumZoom={{x: 180}}
              onZoomDomainChange={(domain, props) => this.handleDomainChange(domain, props)}
            />
          }
        >
          <VictoryLabel text='Duration of journeys' x={this.leftPadding} y={theme.typography.baseSize * theme.typography.chartAxisLabelRemRatio} textAnchor='start' style={this.chartTitleFontStyles}/>
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
              tickLabels: {padding: 4, ...this.labelFontStyles}
            }}
          />
          <VictoryAxis
            dependentAxis
            tickLabelComponent={<VictoryLabel lineHeight={1}/>}
            tickFormat={b => {
              let [ originZone, destZone, buses ] = b.split('-')
              buses = buses.split(',').map(bus => bus.slice(0, -3))
              return `Zone ${originZone} to ${destZone}\n${buses.join(' ⇢ ')}`
            }}
            style={{ tickLabels: this.labelFontStyles }}
          />
        </VictoryChart>
        <VictoryChart
          height={(this.props.keys.length + 1) * this.barThickness + 110}
          width={this.state.width / 3}
          domainPadding={{ y: [this.barThickness, this.barThickness / 2] }}
          padding={{ top: this.topPadding, right: this.rightPadding, bottom: 50, left: 8 }}
          containerComponent={
            <VictoryZoomContainer
              zoomDomain={{y: [0, this.props.keys.length + 1]}}
              zoomDimension='x'
              minimumZoom={{x: 20}}
            />
          }
        >
          <VictoryLabel text={'Number of\ncommuters'} x={8} y={theme.typography.baseSize * theme.typography.chartAxisLabelRemRatio} textAnchor='start' style={this.chartTitleFontStyles}/>
          <VictoryBar
            horizontal={true}
            barRatio={0.8}
            data={this.props.keys.map(k => ({...k, width: this.barThickness}))}
            y={({count}) => count}
            x={({key}) => key}
            labels={({count}) => count}
            style={{ labels: { fill: 'white', ...this.labelFontStyles } }}
            labelComponent={ <VictoryLabel dx={this.labelYOffset} textAnchor='end' /> }
          />
          <VictoryAxis
            label=''
            style={{
              axis: {stroke: 'black'},
              grid: {stroke: 'grey', strokeWidth: '1px', opacity: 0.6},
              ticks: {stroke: 'grey', size: 5},
              tickLabels: {padding: 4, ...this.labelFontStyles}
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={b => null}
          />
        </VictoryChart>
      </ChartWrapper>
    )
  }
}

RouteChoiceChart.propTypes = {
  data: PropTypes.array,
  keys: PropTypes.array
}

export default RouteChoiceChart
