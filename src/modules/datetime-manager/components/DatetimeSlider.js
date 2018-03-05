import React from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import moment from 'moment'
import textures from 'textures'
import Subheader from '../../core/components/Subheader'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  grid-area: slider;
  display: flex;
  flex-direction: column;
`

const ChartsWrapper = styled.div`
  position: relative;
  height: 100%;

  text {
    font-family: 'Barlow', sans-serif;
    font-weight: 500;
    font-size: 0.85rem;
    letter-spacing: 0.07em;
  }
  
  .axis-y {
    .tick line {
      stroke: #eee;
      pointer-events: none;
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
    stroke: #eee;
    pointer-events: none;
  }
  
  .grid .tick text,
  .tooltip-group .tick text {
    fill: #bbb;
    font-weight: 600;
    font-size: 1rem;
  }
  
  .grid .domain {
    display: none;
  }
  
  .brush-domain-axis .tick text {
    fill: #555;
    font-weight: 600;
    font-size: 1rem;
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
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
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
      !d3.select(this.ref).select('svg').node()
    ) {
      this.props = nextProps
      this.props.resetForceDatetimeSliderUpdate()
      this.drawSlider()
    }
    return false
  }

  updateDimensions () {
    this.w = this.ref.getBoundingClientRect().width
    this.h = this.ref.getBoundingClientRect().height
  }

  drawSlider () {
    if (this.departureData.length === 0 || this.arrivalData.length === 0) {
      return
    }
    d3.select(this.ref).select('svg').remove()

    const setDatetimeBrushDomain = this.props.setDatetimeBrushDomain
    const setDatetimeZoomDomain = this.props.setDatetimeZoomDomain

    const w = this.w
    const h = this.h / 2
    const padding = { top: 16, right: 20, bottom: 16, left: 60 }

    const maxRidership = Math.max(this.getMaxStackSum(this.arrivalData), this.getMaxStackSum(this.departureData))

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

    // Define axes
    const xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(5)
      .tickFormat(this.formatAxisTime)
      .tickPadding(padding.bottom / 3)

    const yAxis = d3.axisLeft()
      .scale(yScale)
      .tickSize(-(w - padding.left - padding.right))
      .ticks(5)
      .tickPadding(5)

    const xAxisTop = d3.axisTop()
      .scale(xScale)
      .ticks(5)
      .tickFormat(t => '')

    const yAxisInverted = d3.axisLeft()
      .scale(yScaleInverted)
      .tickSize(-(w - padding.left - padding.right))
      .ticks(5)
      .tickPadding(5)

    // Define zoom
    const zoom = d3.zoom()
      .scaleExtent([1, 20])
      .translateExtent([
        [0, 0],
        [w, h]]
      )
      .on('zoom', zooming)

    // Define area generators
    const area = d3.area()
      .curve(d3.curveMonotoneX)
      .x(d => xScale(d.data.date))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))

    const areaInverted = d3.area()
      .curve(d3.curveMonotoneX)
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
      .thicker()
      .stroke('#ddd')

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
      .call(brushX.move, this.props.brushDomain.x.map(xScale))

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
      setDatetimeBrushDomain({x: d1})
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

    // Convert data to format understood by d3
    const arrivalSeries = stack(this.arrivalData)
    const departureSeries = stack(this.departureData)

    function handleHover () {
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

      // const tooltipData = []
      // for (let zone of departureSeries) {
      //   const data = zone[currentDateIndex][1] - zone[currentDateIndex][0]
      //   tooltipData.push({
      //     key: zone.key,
      //     dy: yScale(data / 2 + zone[currentDateIndex][0]),
      //     data,
      //   })
      // }

      tooltipG.call(tooltipAxis.tickValues([currentDate]))
      updateTooltipLineLabel()
    }

    function handleHoverOut () {
      tooltipG.call(tooltipAxis.tickValues([]))
    }

    // Create chart areas
    arrivalChartG.selectAll('path')
      .data(arrivalSeries)
      .enter()
      .append('path')
      .attr('class', 'area')
      .attr('d', areaInverted)
      .attr('fill', (d, i) => this.props.groupColors[d.key])

    departureChartG.selectAll('path')
      .data(departureSeries)
      .enter()
      .append('path')
      .attr('class', 'area')
      .attr('d', area)
      .attr('fill', (d, i) => this.props.groupColors[d.key])

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

      setDatetimeZoomDomain({x: newScale.domain()})
    }

    const k = (xScale.range()[1] - xScale.range()[0]) / (xScale(this.props.zoomDomain.x[1]) - xScale(this.props.zoomDomain.x[0]))
    svg.call(
      zoom.transform,
      d3.zoomIdentity
        .scale(k)
        .translate(-xScale(this.props.zoomDomain.x[0]) + padding.left / k, 0)
    )
  }

  getMaxStackSum (data) {
    return data.reduce((maxVal, step) => {
      const { date, ...rest } = step
      const total = Object.values(rest).reduce((sum, x) => sum + x.sum, 0)
      return total > maxVal ? total : maxVal
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
      <Wrapper>
        <Subheader>Ridership</Subheader>
        <ChartsWrapper innerRef={ref => (this.ref = ref)}>
        </ChartsWrapper>
      </Wrapper>
    )
  }
}

export default DatetimeSlider
