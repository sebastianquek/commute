import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as d3 from 'd3'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import {sortBy} from 'underscore'

momentDurationFormatSetup(moment)

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;

  .visibility-buttons {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0.8rem;
  }

  .visibility-buttons--button {
    font-family: inherit;
    -webkit-appearance: none;
    background-color: transparent;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-bottom-width: 0;
    padding: 0.3em 0.6em;
    cursor: pointer;
    
    &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    
    &:last-child {
      border-bottom-width: 1px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  .button--icon {
    color: #777;
    margin-right: 0.6em;
  }

  svg text {
    font-family: 'Barlow', sans-serif;
    font-weight: 500;
    letter-spacing: 0.07em;
  }

  .transport-service-label {
    font-size: 1rem;
    font-weight: 600;
  }

  .train-service-bar,
  .bus-service-bar,
  .count-bar {
    stroke: white;
  }

  .train-service-bar {
    &:nth-child(even) {
      fill: #6B97E7;
    }
    
    &:nth-child(odd) {
      fill: #6B97E7;
    }
  }

  .bus-service-bar {
    &:nth-child(even) {
      fill: #62D090;
    }
    
    &:nth-child(odd) {
      fill: rgb(60, 190, 114);
    }
  }

  .count-bar {
    fill: #F98C73;
  }

  .duration-label {
    font-size: 0.8rem;
  }

  .axis-label {
    fill: #000;
    font-size: 1.15rem;
    letter-spacing: 0;
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
  }

  .axis .tick line {
    stroke: #d0d0d0;
    stroke-dasharray: 3 3;
  }

  .tooltip-group line {
    stroke: #555;
  }

  .trip-info rect,
  .tooltip-group rect {
    fill: #555;
    opacity: 0.9;
  }

  .trip-info text,
  .tooltip-group text {
    font-size: 0.8rem;
    font-weight: 600;
    fill: white;
  }

  .tooltip-group .domain {
    display: none;
  }
`

class RouteChoiceChart extends Component {
  static minNumVisibleRoutes = 8
  static visibleRoutesIncrement = 8

  constructor (props) {
    super(props)
    this.init = this.init.bind(this)
  }

  componentDidMount () {
    this.init(this.props.routes)
    this.drawCharts(this.routes.slice(0, this.numVisibleRoutes))
  }

  init (routes) {
    this.routes = this.generateStackValues(routes)
    this.routes = this.sortJourneys(this.routes)
    this.numRoutes = this.routes.length
    this.numVisibleRoutes = RouteChoiceChart.minNumVisibleRoutes
  }

  drawCharts (routes) {
    const padding = { top: 50, right: 20, bottom: 60, left: 20 }
    const w = 400
    const h = routes.length * 50 + padding.top + padding.bottom

    // Create scale functions
    const xScaleCounts = d3.scaleLinear()
      .domain([0, d3.max(routes, d => d.count)])
      .range([0, w - padding.right - padding.left])
      .nice()

    const xScale = d3.scaleLinear()
      .domain([
        0,
        d3.max(routes, d => d.trips.reduce((sum, t) => sum + t.duration, 0))
      ])
      .range([0, w - padding.right - padding.left])
      .nice()

    const yScale = d3.scaleBand()
      .domain(d3.range(routes.length))
      .rangeRound([0, h - padding.bottom - padding.top])
      .paddingOuter(0.41)
      .paddingInner(0.82)

    const [ countTickValues, routeTickValues ] = this.generateTickValues(xScaleCounts.domain(), xScale.domain())

    const xAxis = d3.axisTop()
      .scale(xScale)
      .tickFormat(this.formatDuration)
      .tickSize(0)
      .tickPadding(10)
      .tickValues(routeTickValues)

    const xAxisCount = d3.axisBottom()
      .scale(xScaleCounts)
      .tickSize(-(h - padding.bottom - padding.top))
      .tickPadding(10)
      .tickValues(countTickValues)

    const svg = d3.select(this.ref)
      .insert('svg', ':first-child')
      .attr('width', w)
      .attr('height', h)

    const routeXAxis = svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${padding.left}, ${padding.top})`)
      .attr('pointer-events', 'none')
      .call(xAxis)

    routeXAxis.append('text')
      .attr('class', 'axis-label')
      .text('Route durations ⟶')
      .attr('text-anchor', 'start')
      .attr('y', -30)
      .attr('x', 0)

    routeXAxis.select('.domain')
      .remove()

    const countXAxis = svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${padding.left}, ${h - padding.bottom})`)
      .attr('pointer-events', 'none')
      .call(xAxisCount)

    countXAxis.append('text')
      .attr('class', 'axis-label')
      .text('Number of commuters ⟶')
      .attr('text-anchor', 'start')
      .attr('y', 40)
      .attr('x', 0)

    countXAxis.select('.domain')
      .remove()

    function handleHover () {
      const mouseX = d3.mouse(this)[0]
      const count = xScaleCounts.invert(mouseX - padding.left)
      const duration = xScale.invert(mouseX - padding.left)

      tooltipG.call(tooltipAxis.tickValues([duration]))
      if (!tooltipG.select('.tick rect').node()) {
        tooltipG.select('.tick').insert('rect', ':first-child')
          .attr('fill', '#000')
      }

      tooltipG.select('text')
        .attr('text-anchor', 'end')
        .attr('pointer-events', 'none')
        .attr('dy', d3.mouse(this)[1] - padding.top)
        .attr('dx', -10)

      const text = tooltipG.select('text')
      const durationText = text.text()
      const y = text.attr('y')
      const dx = text.attr('dx')
      const dy = parseFloat(text.attr('dy'))
      let i = 0
      text.text(null)
      for (let t of [durationText, `${Math.round(count)} commuters`]) {
        text.append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dx', dx)
          .attr('dy', `${14 * i++ + dy}`)
          .text(t)
      }

      const tooltipTextWidth = tooltipG.select('.tick text tspan:last-child').node().getBBox().width

      tooltipG.select('.tick rect')
        .attr('x', -(tooltipTextWidth + 20))
        .attr('y', -(h - padding.bottom - d3.mouse(this)[1] + 20))
        .attr('rx', 2)
        .attr('ry', 2)
        .attr('height', 40)
        .attr('width', tooltipTextWidth + 20)

      // Ensure tooltip can always be seen
      if (mouseX < tooltipTextWidth + 20) {
        tooltipG.select('text')
          .attr('text-anchor', 'start')
          .attr('dx', 10 + tooltipTextWidth)
          .selectAll('tspan')
          .attr('dx', 10)
        tooltipG.select('.tick rect')
          .attr('x', 0)
      }
    }

    function handleHoverOut () {
      tooltipG.call(tooltipAxis.tickValues([]))
    }

    svg.append('rect')
      .attr('class', 'hover-detector')
      .attr('x', padding.left)
      .attr('y', padding.top)
      .attr('width', w - padding.left - padding.right)
      .attr('height', h - padding.top - padding.bottom)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mousemove', handleHover)
      .on('mouseout', handleHoverOut)

    const tooltipAxis = d3.axisTop(xScale)
      .tickSize(h - padding.bottom - padding.top)
      .tickFormat(this.formatDuration)
      .tickValues([])

    const routeG = svg.append('g')
      .attr('transform', `translate(${padding.left}, ${padding.top})`)
      .selectAll('rect')
      .data(routes)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0, ${yScale(i)})`)

    routeG.append('rect')
      .attr('class', 'count-bar')
      .attr('pointer-events', 'none')
      .attr('x', d => xScaleCounts(0))
      .attr('y', yScale.bandwidth() + 1)
      .attr('width', d => xScaleCounts(d.count))
      .attr('height', yScale.bandwidth())

    const tripRectsContainer = routeG.append('g')
      .attr('class', 'trip-rect-container')

    const tripRects = tripRectsContainer.selectAll('rect.trip-rects')
      .data(d => d.trips)
      .enter()

    tripRectsContainer.append('rect')
      .attr('class', 'stop-events-rect')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .attr('y', -yScale.bandwidth() * 2)

    function addTripInfoMouseEvents (s) {
      s.on('mouseover', function (d, i) {
        const transform = d3.select(this.parentNode.parentNode).attr('transform')
        const translate = /translate\((.*)\)/.exec(transform)[1].split(',').map(d => parseFloat(d.trim()))
        tripInfoG.transition(600).attr('transform', `translate(${padding.left + xScale(d.stackValues[0])}, ${padding.top + translate[1] + yScale.bandwidth()})`)

        tripInfoG.append('rect')
          .attr('height', 0)

        tripInfoG.append('text')
          .attr('y', yScale.bandwidth() * 1.5)
          .attr('x', '0.5em')
          .text(`Stops: ${d.originId} ➞ ${d.destinationId}`)

        tripInfoG.select('rect')
          .attr('height', tripInfoG.select('text').node().getBBox().height + 10)
          .attr('width', tripInfoG.select('text').node().getBBox().width + 10)
      }).on('mouseout', () => {
        svg.selectAll('.trip-info text').remove()
        svg.selectAll('.trip-info rect').remove()
      })
    }

    tripRects.append('rect')
      .attr('x', d => xScale(d.stackValues[0]))
      .attr('width', (d, i) => xScale(d.stackValues[1]) - xScale(d.stackValues[0]))
      .attr('height', yScale.bandwidth())
      .attr('class', d => d.service.includes('{') ? 'train-service-bar' : 'bus-service-bar')
      .call(addTripInfoMouseEvents)

    tripRects.append('text')
      .attr('x', d => xScale(d.stackValues[0]))
      .attr('y', -yScale.bandwidth() / 3 * 2)
      .attr('cursor', 'default')
      .call(addTripInfoMouseEvents)
      .selectAll('tspan')
      .data(d => [`${d.service} — `, this.formatDuration(d.duration)])
      .enter()
      .append('tspan')
      .attr('class', (d, i) => i === 0 ? 'transport-service-label' : 'duration-label')
      .text(d => d)

    // Align overlapping labels
    svg.selectAll('g.trip-rect-container')
      .each(function (d, i) {
        let totalBarWidth = 0
        let totalLabelWidth = 0
        d3.select(this).selectAll('text')
          .each(function (d, i) {
            if (totalLabelWidth > totalBarWidth) {
              d3.select(this).attr('x', xScale(d.stackValues[0]) + 16 + totalLabelWidth - totalBarWidth)
              totalLabelWidth += this.getBBox().width + 16
            } else {
              totalLabelWidth += this.getBBox().width
            }
            totalBarWidth += xScale(d.stackValues[1]) - xScale(d.stackValues[0])
          })

        // Update stop events rectangle dimensions
        d3.select(this).select('.stop-events-rect')
          .attr('height', 20)
          .attr('width', d3.select(this).node().getBBox().width)
      })

    const tooltipG = svg
      .append('g')
      .attr('class', 'tooltip-group')
      .attr('pointer-events', 'none')
      .attr('transform', `translate(${padding.left}, ${h - padding.bottom})`)
      .call(tooltipAxis)

    const tripInfoG = svg
      .append('g')
      .attr('class', 'trip-info')
      .attr('pointer-events', 'none')

    this.addShowAndHideRoutesButtons()
  }

  generateStackValues (journeys) {
    return journeys.map(route => {
      const { trips, ...rest } = route
      return {
        ...rest,
        trips: trips
          .reduce((trips, trip) => {
            const prevMax = trips.slice(-1).length > 0 ? trips.slice(-1)[0].stackValues[1] : 0
            trips.push({
              ...trip,
              stackValues: [prevMax, prevMax + trip.duration]
            })
            return trips
          }, [])
      }
    })
  }

  generateTickValues (countDomain, durationDomain) {
    for (let numTicks of [7, 6, 5, 4, 3, 2]) {
      if (countDomain[1] % numTicks === 0 && durationDomain[1] % numTicks === 0) {
        const range = d3.range(numTicks)
        const tickValues = []
        for (let d of [countDomain, durationDomain]) {
          const scale = d3.scaleQuantize()
            .domain(d)
            .range(range)

          const ticks = range
            .reduce((ticks, t, i, range) => {
              const extent = scale.invertExtent(t)
              ticks.push(extent[0])
              if (i === range.length - 1) ticks.push(extent[1])
              return ticks
            }, [])

          tickValues.push(ticks)
        }
        return tickValues
      }
    }
    return [countDomain.map(Math.round), durationDomain]
  }

  formatDuration (duration) {
    return moment
      .duration(duration, 'seconds')
      .format('h[hrs] m[min]', {
        trim: 'both'
      })
  }

  sortJourneys (journeys) {
    return sortBy(journeys, 'count').reverse()
  }

  addShowAndHideRoutesButtons () {
    d3.select(this.ref)
      .selectAll('.visibility-buttons button')
      .remove()

    if (this.numVisibleRoutes > RouteChoiceChart.minNumVisibleRoutes) {
      const showFewerButton = d3.select(this.ref)
        .select('.visibility-buttons')
        .append('button')
        .attr('class', 'visibility-buttons--button button-fewer')

      showFewerButton.html(
        `<span><span class='button--icon'>▲</span>Show fewer routes</span>`
      )

      showFewerButton.on('click', () => {
        this.numVisibleRoutes -= RouteChoiceChart.visibleRoutesIncrement
        d3.select(this.ref).select('svg').remove()
        this.drawCharts(this.routes.slice(0, this.numVisibleRoutes))
      })
    }

    if (this.numRoutes - this.numVisibleRoutes > 0) {
      const showMoreButton = d3.select(this.ref)
        .select('.visibility-buttons')
        .append('button')
        .attr('class', 'visibility-buttons--button button-more')

      const numRoutesLeft = this.numRoutes - this.numVisibleRoutes
      const numNextRoutes = Math.min(RouteChoiceChart.visibleRoutesIncrement, numRoutesLeft)
      showMoreButton.html(
        `<span><span class='button--icon'>▼</span>Show ${numNextRoutes} more route${numNextRoutes > 1 ? 's' : ''} (${numRoutesLeft} left)</span>`
      )

      showMoreButton.on('click', () => {
        this.numVisibleRoutes += RouteChoiceChart.visibleRoutesIncrement
        d3.select(this.ref).select('svg').remove()
        this.drawCharts(this.routes.slice(0, this.numVisibleRoutes))
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    this.init(nextProps.routes)
    d3.select(this.ref).select('svg').remove()
    this.drawCharts(this.routes.slice(0, this.numVisibleRoutes))
    return false
  }

  render () {
    return (
      <ChartWrapper innerRef={ref => (this.ref = ref)}>
        <div className='visibility-buttons'>
        </div>
      </ChartWrapper>
    )
  }
}

RouteChoiceChart.propTypes = {
  routes: PropTypes.array.isRequired
}

export default RouteChoiceChart
