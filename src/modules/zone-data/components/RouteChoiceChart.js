import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import { VictoryAxis, VictoryChart, VictoryZoomContainer, VictoryStack, VictoryBar, VictoryLabel } from 'victory'

momentDurationFormatSetup(moment)

class RouteChoiceChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showSeconds: false
    }
    this.handleDomainChange = this.handleDomainChange.bind(this)
  }

  handleDomainChange (domain, props) {
    const seconds = Math.floor(domain.x[1] - domain.x[0])
    this.setState({
      showSeconds: seconds <= 320
    })
  }

  render () {
    const keyArray = this.props.keys.map(({key}) => key)
    return (
      <VictoryChart
        height={(this.props.keys.length + 1) * this.props.barThickness + 110}
        horizontal={true}
        domainPadding={{ y: [this.props.barThickness, this.props.barThickness / 2] }}
        padding={{ top: 10, right: 20, bottom: 50, left: 120 }}
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
          style={{ labels: { fill: 'white' } }}
          labelComponent={ <VictoryLabel dx={-60}/> }
        >
          {this.props.data.map((data, index) => {
            return (
              <VictoryBar
                key={index}
                horizontal={true}
                categories={{ y: keyArray }}
                data={this.props.keys.map(k => ({...k, width: this.props.barThickness}))}
                y={({key}) => data[key] ? data[key].duration : 0}
                x={({key}) => key}
                labels={({key}) => data[key] ? data[key].bus : ''}
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
            ticks: {stroke: 'grey', size: 5}
          }}
        />
        <VictoryAxis
          dependentAxis
        />
      </VictoryChart>
    )
  }
}

RouteChoiceChart.propTypes = {
  data: PropTypes.array,
  keys: PropTypes.array,
  barThickness: PropTypes.number
}

RouteChoiceChart.defaultProps = {
  barThickness: 20
}

export default RouteChoiceChart
