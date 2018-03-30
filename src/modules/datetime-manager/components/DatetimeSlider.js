import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import isEqual from 'lodash.isequal'
import throttle from 'lodash.throttle'
import * as d3 from 'd3'
import moment from 'moment'
import textures from 'textures'
import Subheader from '../../core/components/Subheader'
import Spinner from '../../core/components/Spinner'
import { shouldTextBeDark } from '../../../utils/randomColor'
import theme from '../../../utils/theme'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: slider;
  height: 100%;
  width: 100%;
`

const TopBar = styled.div`
  align-items: flex-start;
  display: flex;
  margin-bottom: 0.5em;
`

const DomainLabel = styled.div`
  color: ${({theme}) => theme.colors.textPrimary};
  flex-grow: 1;
  font-family: 'Barlow', sans-serif;
  font-size: ${({theme}) => theme.typography.headerSize};
  font-weight: 700;
  letter-spacing: 0.07em;
  text-align: center;
`

const ChartsWrapper = styled.div`
  height: 100%;
  position: relative;

  text {
    font-family: 'Barlow', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.07em;
  }
  
  .axis-y {
    .tick line {
      pointer-events: none;
      stroke: #eee;
    }

    .tick:first-of-type line {
      display: none;
    }

    .domain {
      display: none;
    }
  }

  .grid .tick line,
  .brush-domain-axis .tick line {
    pointer-events: none;
    stroke: #eee;
  }
  
  .grid .tick text,
  .tooltip-group .tick text {
    fill: #bbb;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .grid .domain {
    display: none;
  }
  
  .brush-domain-axis .tick text {
    fill: #555;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .tooltip-group .tick {
    pointer-events: none;

    line {
      stroke: #555;
    }
    
    text {
      fill: #555;
    }
  }
  
  .axis-label {
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .values-container--values text {
    font-size: 1rem;
    font-weight: 600;
  }

  .values-container--header {
    font-weight: 600;
    text-transform: uppercase;
  }
`

class DatetimeSlider extends React.Component {
  constructor (props) {
    super(props)
    this.w = 0
    this.h = 0
    this.departureData = []
    this.arrivalData = []
    this.updateDimensions = this.updateDimensions.bind(this)
    this.hideSpinner = this.hideSpinner.bind(this)
    this.showSpinner = this.showSpinner.bind(this)
    this.updateDomainLabel = this.updateDomainLabel.bind(this)
    this.drawSlider = this.drawSlider.bind(this)
  }

  componentDidMount () {
    this.updateDimensions()
    this.drawSlider()
  }

  shouldComponentUpdate (nextProps, nextState) {
    this.departureData = nextProps.data.departureData || []
    this.arrivalData = nextProps.data.arrivalData || []
    if (
      nextProps.shouldUpdate ||
      !isEqual(nextProps.zoneIds, this.props.zoneIds) ||
      nextProps.chartFormat !== this.props.chartFormat ||
      nextProps.showAbsoluteRidership !== this.props.showAbsoluteRidership
    ) {
      this.props = nextProps
      this.drawSlider()
      this.props.resetForceDatetimeSliderUpdate()
    }

    if (nextProps.isFetchingRidershipData) {
      this.showSpinner()
    } else {
      this.hideSpinner()
    }

    this.updateDomainLabel(nextProps.brushDomain)
    return false
  }

  updateDimensions () {
    this.w = this.ref.getBoundingClientRect().width
    this.h = this.ref.getBoundingClientRect().height
  }

  hideSpinner () {
    d3.select(this.wrapperRef).select('.spinner').transition(800).style('opacity', 0)
  }

  showSpinner () {
    d3.select(this.wrapperRef).select('.spinner').transition(800).style('opacity', 1)
  }

  updateDomainLabel (domain) {
    const text = `
      ${this.formatDomainTime(domain[0])} – ${this.formatDomainTime(domain[1])}
      (${moment.duration(moment(domain[1]).diff(domain[0])).humanize()})
    `
    d3.select(this.wrapperRef).select('.domain-label').html(text)
  }

  drawSlider () {
    if (this.departureData.length === 0 || this.arrivalData.length === 0) {
      return
    }
    d3.select(this.ref).select('svg').remove() // Redraw SVG

    const setDatetimeBrushDomain = throttle(this.props.setDatetimeBrushDomain, 500)
    const setDatetimeZoomDomain = throttle(this.props.setDatetimeZoomDomain, 500)
    const groupColors = this.props.groupColors
    let brushDomain = this.props.brushDomain

    const w = this.w
    const h = this.h / 2
    const padding = { top: 14, right: 150, bottom: 14, left: 60 }

    let maxRidership
    if (this.props.showAbsoluteRidership) {
      switch (this.props.chartFormat) {
        case 'stack':
          maxRidership = Math.max(this.getMaxStackSum(this.arrivalData), this.getMaxStackSum(this.departureData))
          break
        case 'line':
        default:
          maxRidership = Math.max(this.getMaxValue(this.arrivalData), this.getMaxValue(this.departureData))
          break
      }
    } else {
      maxRidership = 1
    }

    // Create scale functions
    const xScale = d3.scaleTime()
      .domain([
        d3.min(this.departureData, d => d.date),
        d3.max(this.departureData, d => d.date)
      ])
      .range([padding.left, w - padding.right])

    const yScale = d3.scaleLinear()
      .domain([0, maxRidership])
      .range([h - padding.bottom, padding.top])
      .nice()

    const yScaleInverted = d3.scaleLinear()
      .domain([0, maxRidership])
      .range([padding.top, h - padding.bottom])
      .nice()

    // Calculate max zoom out value
    const k = (xScale.range()[1] - xScale.range()[0]) / (xScale(this.props.zoomDomain[1]) - xScale(this.props.zoomDomain[0]))

    // Define axes
    const xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(5)
      .tickFormat(this.formatAxisTime)
      .tickPadding(padding.bottom / 3)
      .tickSize(5)

    const yAxis = d3.axisLeft()
      .scale(yScale)
      .tickSize(-(w - padding.left - padding.right))
      .ticks(5)
      .tickPadding(5)

    const xAxisTop = d3.axisTop()
      .scale(xScale)
      .ticks(5)
      .tickFormat(t => '')
      .tickSize(5)

    const yAxisInverted = d3.axisLeft()
      .scale(yScaleInverted)
      .tickSize(-(w - padding.left - padding.right))
      .ticks(5)
      .tickPadding(5)

    // Define zoom
    const zoom = d3.zoom()
      .scaleExtent([k, 20])
      .translateExtent([
        [0, 0],
        [w, h]]
      )
      .on('zoom', zooming)

    // Define line generators
    const line = d3.line()
      .x(d => xScale(d.data.date))
      .y(d => yScale(d[1] - d[0]))

    const lineInverted = d3.line()
      .x(d => xScale(d.data.date))
      .y(d => yScaleInverted(d[1] - d[0]))

    // Define area generators
    const area = d3.area()
      .x(d => xScale(d.data.date))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))

    const areaInverted = d3.area()
      .x(d => xScale(d.data.date))
      .y0(d => yScaleInverted(d[0]))
      .y1(d => yScaleInverted(d[1]))

    // Create SVG element
    const svg = d3.select(this.ref)
      .append('svg')
      .attr('width', w)
      .attr('height', h * 2)
      .call(zoom)

    // Create clip path for entire chart area
    svg
      .append('clipPath')
      .attr('id', 'entire-chart-area')
      .append('rect')
      .attr('x', padding.left)
      .attr('y', padding.top)
      .attr('width', w - padding.left - padding.right)
      .attr('height', h * 2 - padding.top - padding.bottom)
      .attr('fill', 'none')

    // Setup brush domain background texture
    const bgTexture = textures
      .lines()
      .stroke('#ddd')
      .size(5)
      .strokeWidth(1)

    svg.call(bgTexture)

    // Create brush domain background
    const brushDomainBgContainer = svg.append('g')

    const brushDomainBgMask = brushDomainBgContainer
      .append('clipPath')
      .attr('id', 'brush-domain-bg-area')
      .append('rect')
      .attr('x', padding.left)
      .attr('y', padding.top)
      .attr('width', 0)
      .attr('height', h * 2 - padding.top - padding.bottom)
      .attr('fill', 'none')

    const brushDomainBg = brushDomainBgContainer.append('g')
      .attr('class', 'brush-domain-bg-areas')

    brushDomainBg
      .append('g')
      .attr('clip-path', 'url(#brush-domain-bg-area)')
      .append('rect')
      .attr('x', padding.left)
      .attr('y', padding.top)
      .attr('width', w - padding.left - padding.right)
      .attr('height', h - padding.top - padding.bottom)
      .attr('fill', bgTexture.url())

    brushDomainBg
      .append('g')
      .attr('clip-path', 'url(#brush-domain-bg-area)')
      .append('rect')
      .attr('x', padding.left)
      .attr('y', h + padding.top)
      .attr('width', w - padding.left - padding.right)
      .attr('height', h - padding.top - padding.bottom)
      .attr('fill', bgTexture.url())

    // Create background grid
    const grid = d3.axisTop(xScale)
      .ticks(d3.timeDay.every(1))
      .tickSize(h * 2 - padding.top - padding.bottom)
      .tickFormat(this.formatGridTime)

    const gridG = svg
      .append('g')
      .attr('clip-path', 'url(#entire-chart-area)')
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0, ${h * 2 - padding.bottom})`)
      .call(grid)

    function updateGridLabels () {
      gridG.attr('text-anchor', 'start')
        .selectAll('text')
        .attr('dy', '1.2em')
        .attr('dx', '0.5em')
        .each(function () {
          const text = d3.select(this)
          const [day, date, month] = text.text().split(' ')
          const y = text.attr('y')
          const dx = text.attr('dx')
          const dy = parseFloat(text.attr('dy'))
          const lineHeight = 1.05
          let i = 0
          text.text(null)
          for (let t of [day, [date, month].join(' ')]) {
            text.append('tspan')
              .attr('x', 0)
              .attr('y', y)
              .attr('dx', dx)
              .attr('dy', `${lineHeight * i++ + dy}em`)
              .text(t)
          }
        })
    }

    updateGridLabels()

    // Create chart groups
    const departureG = svg.append('g')
      .attr('width', w)
      .attr('height', h)

    const arrivalG = svg.append('g')
      .attr('width', w)
      .attr('height', h)
      .attr('transform', `translate(0, ${h})`)

    // Create axis titles
    departureG.append('text')
      .attr('class', 'axis-label')
      .text('Departures')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('y', 16)
      .attr('x', -h / 2)

    arrivalG.append('text')
      .attr('class', 'axis-label')
      .text('Arrivals')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('y', 16)
      .attr('x', -h / 2)

    // Create y axes
    departureG.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', 'translate(' + padding.left + ',0)')
      .call(yAxis)

    arrivalG.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', 'translate(' + padding.left + ',0)')
      .call(yAxisInverted)

    // Create sub groups for actual svg paths
    const departureChartG = departureG
      .append('g')
      .attr('clip-path', 'url(#entire-chart-area)')
      .append('g')

    const arrivalChartG = arrivalG
      .append('g')
      .attr('clip-path', 'url(#entire-chart-area)')
      .append('g')

    // Create x axes
    const departureGX = departureG.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (h - padding.bottom) + ')')
      .attr('pointer-events', 'none')
      .call(xAxis)

    const arrivalGX = arrivalG.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + padding.top + ')')
      .attr('pointer-events', 'none')
      .call(xAxisTop)

    // Create brush domain feedback
    const brushDomainLabelsHeight = h * 2 - padding.top - padding.bottom
    const brushDomainLabelsOffsetTop = h * 2 - ((h * 2 - brushDomainLabelsHeight) / 2)

    const brushDomainAxis = d3.axisTop(xScale)
      .tickSize(brushDomainLabelsHeight)
      .tickFormat(this.formatDomainTime)
      .tickValues([])

    const brushDomainAxisG = svg
      .append('g')
      .attr('clip-path', 'url(#entire-chart-area)')
      .append('g')
      .attr('class', 'brush-domain-axis')
      .attr('transform', `translate(0, ${brushDomainLabelsOffsetTop})`)
      .call(brushDomainAxis)

    brushDomainAxisG.select('.domain').attr('stroke', 'none')

    function updateBrushDomainLabels () {
      let i = 0
      brushDomainAxisG
        .selectAll('text')
        .each(function () {
          const text = d3.select(this)
          text.attr('dy', '1.2em')
          if (i === 0) text.attr('dx', '-0.5em').attr('text-anchor', 'end')
          if (i === 1) text.attr('dx', '0.5em').attr('text-anchor', 'start')
          i++

          const [day, date, month, time] = text.text().split(' ')
          const lineHeight = 1.05
          const y = text.attr('y')
          const dx = text.attr('dx')
          const dy = parseFloat(text.attr('dy'))
          let j = 0
          text.text(null)
          for (let t of [day, [date, month].join(' '), time]) {
            text.append('tspan')
              .attr('x', 0)
              .attr('y', y)
              .attr('dx', dx)
              .attr('dy', `${lineHeight * j++ + dy}em`)
              .text(t)
          }
        })
    }

    updateBrushDomainLabels()

    // Create brush
    const brushContainer = svg
      .append('g')
      .attr('transform', `translate(0, ${h - padding.bottom})`)

    brushContainer.append('clipPath')
      .attr('id', 'brush-area')
      .append('rect')
      .attr('x', padding.left)
      .attr('width', w - padding.left - padding.right)
      .attr('height', padding.top + padding.bottom)

    const brushX = d3.brushX()
      .extent([
        [padding.left, 0],
        [w - padding.right, padding.bottom + padding.top]
      ])
      .on('brush', brushing)
      .on('start', startBrushing)
      .on('end', stopBrushing)

    const brush = brushContainer
      .append('g')
      .attr('clip-path', 'url(#brush-area)')
      .append('g')
      .attr('class', 'brush')
      .call(brushX)
      .call(brushX.move, this.props.brushDomain.map(xScale))

    brush.selectAll('.overlay')
      .on('mousedown touchstart', clearBrush)

    brush.select('.selection').attr('stroke', 'none')

    function startBrushing () {
      brushDomainAxisG.transition(800).attr('opacity', 1)
      brushDomainBg.transition(800).attr('opacity', 1)
      gridG.selectAll('text').transition(800).attr('opacity', 0)
    }

    function stopBrushing () {
      brushDomainAxisG.transition(800).delay(500).attr('opacity', 0)
      brushDomainBg.transition(800).delay(500).attr('opacity', 0.5)
      gridG.selectAll('text').transition(800).delay(500).attr('opacity', 1)
    }

    function clearBrush () {
      brushDomainAxisG.call(brushDomainAxis.tickValues([]))
      brushDomainBgMask.attr('x', 0)
      brushDomainBgMask.attr('width', 0)
    }

    function brushing () {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return
      const d0 = d3.event.selection.map(xScale.invert)
      const d1 = d0.map(d3.timeHour.round)

      // If empty when rounded, use floor instead.
      if (d1[0] >= d1[1]) {
        d1[0] = d3.timeHour.floor(d0[0])
        d1[1] = d3.timeHour.offset(d1[0])
      }
      if (
        !moment(d1[0]).isSame(brushDomain[0]) ||
        !moment(d1[1]).isSame(brushDomain[1])
      ) {
        setDatetimeBrushDomain(d1)
        brushDomain = d1
      }
      brushDomainAxisG.call(brushDomainAxis.tickValues(d1))
      brushDomainBgMask.attr('x', xScale(d1[0]))
      brushDomainBgMask.attr('width', xScale(d1[1]) - xScale(d1[0]))
      updateBrushDomainLabels()
      d3.select(this).call(d3.event.target.move, d1.map(xScale))
    }

    const keys = Object.keys(this.arrivalData[0]).filter(k => k !== 'date')
    const stack = d3.stack()
      .keys(keys)
      .value((d, key) => d[key].sum)
      .order(d3.stackOrderReverse)

    // Convert data to format understood by d3
    const arrivalSeries = stack(this.arrivalData)
    const departureSeries = stack(this.departureData)

    function handleHover () {
      if (maxRidership === 0) return // no data to hover over
      const mouseX = d3.mouse(this)[0]
      const mouseDate = xScale.invert(mouseX)
      const bisectDate = d3.bisector(d => d.data.date).left
      let currentDateIndex = bisectDate(departureSeries[0], mouseDate)

      const d0 = departureSeries[0][currentDateIndex - 1] && departureSeries[0][currentDateIndex - 1].data.date
      const d1 = departureSeries[0][currentDateIndex] && departureSeries[0][currentDateIndex].data.date
      let currentDate = d1

      if (
        d1 === undefined ||
        (d0 !== undefined && mouseDate - d0 < d1 - mouseDate)
      ) { // pick the earlier date instead
        currentDateIndex -= 1
        currentDate = d0
      }

      const data = []
      const length = departureSeries.length
      for (let i = 0; i < length; i++) {
        const currZoneDepartureData = departureSeries[i][currentDateIndex]
        const currZoneArrivalData = arrivalSeries[i][currentDateIndex]
        data.push({
          key: departureSeries[i].key,
          numDepartures: currZoneDepartureData[1] - currZoneDepartureData[0],
          numArrivals: currZoneArrivalData[1] - currZoneArrivalData[0]
        })
      }

      updateLegend(data)

      tooltipG.call(tooltipAxis.tickValues([currentDate]))
      updateTooltipLineLabel()
    }

    function handleHoverOut () {
      updateLegend([])
      tooltipG.call(tooltipAxis.tickValues([]))
    }

    function updateLegend (data) {
      const selectionWithData = ridershipValues
        .selectAll('g.value-container--row')
        .data(data, d => d.key)

      // Transition exit nodes
      selectionWithData.exit()
        .transition(900)
        .delay((d, i) => i * 30)
        .attr('opacity', 0)
        .attr('transform', 'translate(0, 0)')
        .remove()

      const valuesG = selectionWithData.enter()
        .append('g')
        .attr('class', 'value-container--row')

      // Transition enter nodes
      valuesG.attr('opacity', 0)
        .transition(900)
        .delay((d, i) => i * 30)
        .attr('opacity', 1)
        .attr('transform', (d, i) => `translate(0, ${i * 28})`)

      // Add group id nodes
      const keyGroups = valuesG.append('g')
        .attr('transform', 'translate(34, 0)')

      keyGroups.append('rect')
        .attr('class', 'key-rect')
        .attr('width', 18)
        .attr('height', 18)
        .attr('rx', 18)
        .attr('ry', 18)
        .attr('stroke', '#4F4F4F')
        .attr('transform', 'rotate(45)')
        .attr('y', -12)
        .attr('x', -12)

      keyGroups.append('text')
        .attr('text-anchor', 'middle')
        .attr('class', 'key-value')

      // Add departure value nodes
      valuesG.append('text')
        .attr('class', 'departure-value')
        .attr('x', 60)

      // Add arrival value nodes
      valuesG.append('text')
        .attr('class', 'arrival-value')
        .attr('x', 96)

      // Set key values
      valuesG.merge(selectionWithData)
        .select('rect.key-rect')
        .attr('fill', d => groupColors[d.key])

      valuesG.merge(selectionWithData)
        .select('text.key-value')
        .attr('fill', d => shouldTextBeDark(groupColors[d.key]) ? theme.colors.textPrimary : theme.colors.textSecondaryAlt)
        .text(d => d.key)

      // Set departure values
      valuesG.merge(selectionWithData)
        .select('text.departure-value')
        .text(d => Math.round(d.numDepartures) === d.numDepartures ? d.numDepartures : d.numDepartures.toFixed(2))

      // Set arrival values
      valuesG.merge(selectionWithData)
        .select('text.arrival-value')
        .text(d => Math.round(d.numArrivals) === d.numArrivals ? d.numArrivals : d.numArrivals.toFixed(2))
    }

    switch (this.props.chartFormat) {
      case 'stack': // Create chart areas
        arrivalChartG.selectAll('path')
          .data(arrivalSeries)
          .enter()
          .append('path')
          .attr('class', 'area')
          .attr('d', areaInverted)
          .attr('fill', (d, i) => this.props.groupColors[d.key])
          .attr('stroke-width', 2)
          .attr('vector-effect', 'non-scaling-stroke')

        departureChartG.selectAll('path')
          .data(departureSeries)
          .enter()
          .append('path')
          .attr('class', 'area')
          .attr('d', area)
          .attr('fill', (d, i) => this.props.groupColors[d.key])
          .attr('stroke-width', 2)
          .attr('vector-effect', 'non-scaling-stroke')

        break

      case 'line': // Create chart lines
      default:
        arrivalChartG.selectAll('path')
          .data(arrivalSeries)
          .enter()
          .append('path')
          .attr('class', 'area')
          .attr('d', lineInverted)
          .attr('stroke', (d, i) => this.props.groupColors[d.key])
          .attr('stroke-width', 2)
          .attr('vector-effect', 'non-scaling-stroke')
          .attr('fill', 'none')

        departureChartG.selectAll('path')
          .data(departureSeries)
          .enter()
          .append('path')
          .attr('class', 'area')
          .attr('d', line)
          .attr('stroke', (d, i) => this.props.groupColors[d.key])
          .attr('stroke-width', 2)
          .attr('vector-effect', 'non-scaling-stroke')
          .attr('fill', 'none')
        break
    }

    // Create invisible chart hover detector
    arrivalChartG.append('rect')
      .attr('x', padding.left)
      .attr('y', padding.top)
      .attr('width', w - padding.left - padding.right)
      .attr('height', h - padding.top - padding.bottom)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mousemove', handleHover)
      .on('mouseout', handleHoverOut)

    departureChartG.append('rect')
      .attr('x', padding.left)
      .attr('y', padding.top)
      .attr('width', w - padding.left - padding.right)
      .attr('height', h - padding.top - padding.bottom)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mousemove', handleHover)
      .on('mouseout', handleHoverOut)

    // Create tooltip line
    const tooltipAxis = d3.axisTop(xScale)
      .tickSize(brushDomainLabelsHeight)
      .tickFormat(this.formatDomainTime)
      .tickValues([])

    const tooltipG = svg
      .append('g')
      .attr('clip-path', 'url(#entire-chart-area)')
      .append('g')
      .attr('class', 'tooltip-group')
      .attr('transform', `translate(0, ${h * 2 - padding.bottom})`)
      .call(tooltipAxis)

    function updateTooltipLineLabel () {
      tooltipG
        .attr('text-anchor', 'start')
        .selectAll('text')
        .attr('dy', '1.2em')
        .attr('dx', '0.5em')
        .each(function () {
          const text = d3.select(this)
          const [day, date, month, time] = text.text().split(' ')
          const lineHeight = 1.05
          const y = text.attr('y')
          const dx = text.attr('dx')
          const dy = parseFloat(text.attr('dy'))
          let j = 0
          text.text(null)
          for (let t of [day, [date, month].join(' '), time]) {
            text.append('tspan')
              .attr('x', 0)
              .attr('y', y)
              .attr('dx', dx)
              .attr('dy', `${lineHeight * j++ + dy}em`)
              .text(t)
          }
        })
    }

    updateTooltipLineLabel()

    const ridershipValuesG = svg.append('g')
      .attr('class', 'values-container')
      .attr('transform', `translate(${w - padding.right - 6}, 0)`)

    ridershipValuesG.append('text')
      .attr('class', 'values-container--header')
      .text('Departures')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'start')
      .attr('y', 85)
      .attr('x', 5)

    ridershipValuesG.append('text')
      .attr('class', 'values-container--header')
      .text('Arrivals')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'start')
      .attr('y', 111)
      .attr('x', 32)

    const ridershipValues = ridershipValuesG.append('g')
      .attr('transform', 'translate(0, 84)')
      .attr('class', 'values-container--values')

    function zooming () {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return

      [brushDomainBgMask, brush, departureChartG, arrivalChartG].forEach(s =>
        s.attr(
          'transform',
          `translate(${d3.event.transform.x}, 0) scale(${d3.event.transform.k}, 1)`
        )
      )
      const newScale = d3.event.transform.rescaleX(xScale)
      departureGX.call(xAxis.scale(newScale))
      arrivalGX.call(xAxisTop.scale(newScale))
      gridG.call(grid.scale(newScale))
      brushDomainAxisG.call(brushDomainAxis.scale(newScale))
      tooltipG.call(tooltipAxis.scale(newScale))
      updateGridLabels()
      updateBrushDomainLabels()
      updateTooltipLineLabel()

      svg.call(
        zoom.transform,
        d3.zoomIdentity
          .translate(d3.event.transform.x, 0)
          .scale(d3.event.transform.k)
      )

      setDatetimeZoomDomain(newScale.domain())
    }

    svg.call(
      zoom.transform,
      d3.zoomIdentity
        .scale(k)
        .translate(-xScale(this.props.zoomDomain[0]) + padding.left / k, 0)
    )
  }

  getMaxStackSum (data) {
    return data.reduce((maxVal, step) => {
      const { date, ...rest } = step
      const total = Object.values(rest).reduce((sum, x) => sum + x.sum, 0)
      return total > maxVal ? total : maxVal
    }, 0)
  }

  getMaxValue (data) {
    return data.reduce((maxVal, step) => {
      const { date, ...rest } = step
      const max = d3.max(Object.values(rest), x => x.sum)
      return max > maxVal ? max : maxVal
    }, 0)
  }

  formatAxisTime (time) {
    const t = moment(time)
    return (t.hour() === 0 && t.minute() === 0) ? null : t.format('h.mm a')
  }

  formatGridTime (time) {
    const t = moment(time)
    return (t.hour() === 0 && t.minute() === 0) ? t.format('dddd D MMMM') : null
  }

  formatDomainTime (time) {
    const t = moment(time)
    return t.format('dddd D MMMM h.mma')
  }

  render () {
    return (
      <Wrapper innerRef={ref => (this.wrapperRef = ref)}>
        <TopBar>
          <Subheader>Ridership</Subheader>
          <Spinner extraCSS='margin: 0 0 0 1ch;' className='spinner'/>
          <DomainLabel className='domain-label' />
        </TopBar>
        <ChartsWrapper innerRef={ref => (this.ref = ref)}>
        </ChartsWrapper>
      </Wrapper>
    )
  }
}

DatetimeSlider.propTypes = {
  brushDomain: PropTypes.array.isRequired,
  zoomDomain: PropTypes.array.isRequired,
  zoneIds: PropTypes.array.isRequired,
  groupColors: PropTypes.object.isRequired,
  isFetchingRidershipData: PropTypes.bool.isRequired,
  chartFormat: PropTypes.string.isRequired,
  showAbsoluteRidership: PropTypes.bool.isRequired,
  setDatetimeBrushDomain: PropTypes.func.isRequired,
  setDatetimeZoomDomain: PropTypes.func.isRequired,
  resetForceDatetimeSliderUpdate: PropTypes.func.isRequired
}

DatetimeSlider.defaultProps = {
  chartFormat: 'line'
}

export default DatetimeSlider
