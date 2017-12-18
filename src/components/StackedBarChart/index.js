import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import ReactFauxDOM from 'react-faux-dom'
import theme from '../../theme'

const d3 = {
  ...require('d3-shape'),
  ...require('d3-array'),
  ...require('d3-scale'),
  ...require('d3-axis'),
  ...require('d3-selection'),
  ...require('d3-transition')
}
const {arrayOf, string, number, func, object, any} = PropTypes

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Poppins');

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }
`

const Wrapper = styled.div`
  font-family: 'Poppins', sans-serif;
  color: ${({theme}) => theme.colors.textPrimary};
  .tick text {
    font-family: 'Poppins', sans-serif;
    color: ${({theme}) => theme.colors.textPrimary};
  }

  @keyframes expandWidth {
    from {transform: scale(0, 1);}
    to {transform: scale(1, 1);}
  }
  .series > rect {
    animation: expandWidth 0.7s;
    transition: all 0.4s;
  }
`

class BarChart extends React.Component {
  static propTypes = {
    data: arrayOf(object),
    keys: arrayOf(string),
    colors: arrayOf(string)
  }

  render () {
    const margin = {top: 20, right: 10, bottom: 50, left: 50}
    const graphWidth = 700 - margin.left - margin.right
    const graphHeight = 300 - margin.top - margin.bottom - 18

    const stack = d3.stack().keys(this.props.keys)
    const stackedSeries = stack(this.props.data)
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(stackedSeries, s => d3.max(s, d => d[1]))])
      .range([0, graphWidth])
      .nice()
    const xAxis = d3.axisBottom().scale(xScale)

    const svg = d3.select(ReactFauxDOM.createElement('svg'))

    svg.attr('width', 700)
      .attr('height', 300)
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(50, 110)`)
      .call(xAxis)

    svg.append('g')
      .selectAll('text')
      .data(this.props.data, d => d)
      .enter()
      .append('text')
      .text(d => d.day)
      .attr('y', (d, i) => i * 22 + 15)
      .style('text-anchor', 'end')
      .attr('x', 40)

    const g = svg
      .selectAll('g.series')
      .data(stackedSeries)
      .enter()
      .append('g')
      .classed('series', true)
      .style('fill', (d, i) => this.props.colors[i])
      .attr('transform', 'translate(50, 0)')

    g.selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('width', 0)
      .attr('width', d => xScale(d[1] - d[0]))
      .attr('x', d => xScale(d[0]))
      .attr('y', (d, i) => i * 22)
      .attr('height', 20)

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          {svg.node().toReact()}
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default BarChart
