import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as d3 from 'd3'

const Chart = styled.div`
  .links path {
    fill: none;
    stroke: #666;
    stroke-dasharray: 23px 1px;
    animation: animate 4s infinite linear;
  }

  @keyframes animate {
    to {
      stroke-dashoffset: -48;
    }
  }

  .node {
    cursor: pointer;
  }

  .group-rect {
    stroke: #4F4F4F;
    stroke-width: 1px;
  }

  .group-number {
    font-family: 'Barlow', sans-serif;
    font-weight: 600;
    font-size: 0.7rem;
    text-anchor: middle;
    pointer-events: none;
    fill: #4F4F4F;
  }
`

class RouteChoicesChart extends Component {
  constructor (props) {
    super(props)
    this.w = 0
    this.h = 0
    this.links = []
  }

  componentDidMount () {
    this.w = this.ref.getBoundingClientRect().width
    this.h = this.w
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.shouldUpdate) {
      this.removeChart()
      this.drawChart(
        nextProps.links, nextProps.nodes, nextProps.linksMetadata,
        nextProps.setTooltipInfo, this.w, this.h
      )
      this.props.resetForceRouteChoicesChartUpdate()
    }
    return false
  }

  removeChart () {
    d3.select(this.ref).select('svg').remove()
  }

  drawChart (links, nodes, linksMetadata, setTooltipInfo, w, h) {
    const svg = d3.select(this.ref)
      .append('svg')
      .attr('width', w)
      .attr('height', h)

    const defs = svg.append('defs')
    this.addGradients(defs, links)
    const {
      linkWidthScale, linkOpacityScale, linkDistanceScale, nodeSizeScale
    } = this.setupScales(links, nodes)

    const simulation = d3.forceSimulation(nodes)
      .force('link',
        d3.forceLink(links)
          .id(d => d.zone)
          .distance(d => linkDistanceScale(d.totalDuration))
          // .strength(link => 1 / Math.min(link.source.numLinks, link.target.numLinks) * 2)
      )
      .force('charge',
        d3.forceManyBody()
          .strength(-300)
      )
      .force('center',
        d3.forceCenter(w / 2, h / 2)
      )
      .on('tick', () => this.tick(linkElements, nodeElements, linksMetadata, defs, nodeSizeScale))

    const linkElements = svg.append('g')
      .attr('class', 'links')
      .selectAll('path')
      .data(links)
      .enter()
      .append('g')
      .on('mouseover', function () {
        const data = d3.select(this).data()[0]
        const path = d3.select(this).select('path').node()
        const { x, y } = path.getPointAtLength(0.5 * path.getTotalLength())
        setTooltipInfo(data, x, y)
      })
      .on('mouseout', function () {
        setTooltipInfo()
      })
      .append('path')
      .attr('stroke-width', d => linkWidthScale(d.count))
      .attr('opacity', d => linkOpacityScale(d.count))
      .style('stroke', d => `url(#S${d.source.group}-T${d.target.group})`)

    const nodeElements = svg.append('g')
      .selectAll('g.node')
      .data(d3.values(nodes))
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `scale(${nodeSizeScale(d.numLinks)})`)

    nodeElements.call(d3.drag()
      .on('start', d => this.dragStarted(d, simulation))
      .on('drag', this.dragging)
      .on('end', d => this.dragEnded(d, simulation))
    )

    nodeElements.append('rect')
      .attr('class', 'group-rect')
      .attr('fill', d => d.color)
      .attr('width', 18)
      .attr('height', 18)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('y', -9)
      .attr('x', -9)
      .attr('transform', 'rotate(45)')

    nodeElements.append('text')
      .attr('class', 'group-number')
      .attr('y', '0.26rem')
      .text(d => d.group)
  }

  addGradients (defs, links) {
    for (let link of links) {
      const id = `S${link.source.group}-T${link.target.group}`
      if (defs.select(`#${id}`).empty()) {
        const gradient = defs.append('linearGradient')
          .attr('id', id)
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '100%')
          .attr('y2', '0%')

        gradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', link.sourceColor)
          .attr('stop-opacity', 1)

        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', link.targetColor)
          .attr('stop-opacity', 1)
      }
    }
  }

  setupScales (links, nodes) {
    return {
      // Scale for link widths
      linkWidthScale: d3.scaleLinear()
        .domain([d3.min(links, d => d.count), d3.max(links, d => d.count)])
        .range([6, 24]),

      // Scale for stroke opacity
      linkOpacityScale: d3.scaleLinear()
        .domain([d3.min(links, d => d.count), d3.max(links, d => d.count)])
        .range([1, 1]),

      // Scale for link distance
      linkDistanceScale: d3.scaleLinear()
        .domain([d3.min(links, d => d.totalDuration), d3.max(links, d => d.totalDuration)])
        .range([80, 200]),

      // Scale for node size
      nodeSizeScale: d3.scaleLinear()
        .domain([d3.min(nodes, d => d.numLinks), d3.max(nodes, d => d.numLinks)])
        .range([0.8, 3])
    }
  }

  tick (linkElements, nodeElements, linksMetadata, defs, nodeSizeScale) {
    linkElements.attr('d', link => {
      const key = link.source.group < link.target.group ? `${link.source.group}-${link.target.group}` : `${link.target.group}-${link.source.group}`
      const { numLinks } = linksMetadata[key]

      const dx = link.target.x - link.source.x
      const dy = link.target.y - link.source.y
      let dr = Math.sqrt(dx * dx + dy * dy) * Math.max(2, numLinks / 5)

      const x = dx / Math.sqrt(dx * dx + dy * dy) / 2
      const y = dy / Math.sqrt(dx * dx + dy * dy) / 2
      defs.select(`#S${link.source.group}-T${link.target.group}`)
        .attr('x1', 0.5 - x)
        .attr('y1', 0.5 - y)
        .attr('x2', 0.5 + x)
        .attr('y2', 0.5 + y)

      if (numLinks !== 1) {
        if (numLinks % 2 === 0) { // even
          // Let a be source -> target, b be target -> source
          // Integer after a or b represents the direction of the arc
          // 1:a0 2:a0 3:b0 4:b0
          // midpoint = 4/2 = 2
          // The following logic ensures that
          // dr(2:a0) == dr(3:b0) and dr(1:a0) == dr(4:b0)
          // and dr(2:a0) < dr(1:a0)
          if (link.linkNum <= Math.ceil(numLinks / 2)) {
            dr /= Math.abs(Math.ceil(numLinks / 2) - link.linkNum) + 1
          } else {
            dr /= Math.abs(Math.ceil(numLinks / 2) - link.linkNum)
          }
        } else {
          if (link.linkNum === Math.ceil(numLinks / 2)) { // middle link
            dr = 0 // no curvature
          } else {
            dr /= Math.abs(Math.ceil(numLinks / 2) - link.linkNum)
          }
        }
      }

      return `M${link.source.x},${link.source.y}A${dr},${dr} 0 0 ${link.direction} ${link.target.x},${link.target.y}`
    })

    nodeElements.attr('transform', d => `translate(${d.x},${d.y}) scale(${nodeSizeScale(d.numLinks)})`)
  }

  dragStarted (d, simulation) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  dragging (d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  dragEnded (d, simulation) {
    if (!d3.event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }

  render () {
    return (
      <Chart innerRef={ref => (this.ref = ref)}>
      </Chart>
    )
  }
}

RouteChoicesChart.propTypes = {
  links: PropTypes.array,
  nodes: PropTypes.array,
  linksMetadata: PropTypes.object,
  setTooltipInfo: PropTypes.func,
  shouldUpdate: PropTypes.bool.isRequired,
  resetForceRouteChoicesChartUpdate: PropTypes.func.isRequired
}

export default RouteChoicesChart
