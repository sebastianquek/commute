import React from 'react'
import PropTypes from 'prop-types'
import Resizable from 're-resizable'
import {DraggableCore} from 'react-draggable'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid} from 'recharts'
import styled, {css} from 'styled-components'
import {fadeSlideLeft, fadeSlideRight} from '../../../../utils/animations'

const Stack = styled.div`
  position: relative;
  height: ${({height}) => height}px;
`

const ChartWrapper = styled.div.attrs({
  style: ({bgPosition}) => ({
    backgroundPosition: bgPosition + '% 100%'
  })
})`
  position: absolute;
  top: 0;
  left: 0;
  // background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
  background-size: 800% 100%;
 
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Grid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(32, ${({columnSize}) => columnSize}px);
  overflow: hidden;
`

const Feedback = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.5);
  color: #eee;
  font-weight: bold;
  width: 32px;
  height: 30px;
  text-align: center;
  border-radius: 3px;
  opacity: ${({showFeedback}) => showFeedback ? 1 : 0};
`

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  justify-self: ${({left}) => left ? 'start' : 'end'};
  grid-column-start: ${({columnStart}) => columnStart};
  grid-column-end: ${({columnEnd}) => columnEnd};
  width: 100%;
  opacity: ${({isResizing}) => isResizing ? 0 : 1};
  transition: 0.2s all;
`

const handleCommonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  font-size: 0.5em;
  height: 40px;
  width: 10px;
  color: #bbb;
  background: rgba(0,0,0,0.5);
  pointer-events: none;
`

const StyledResizable = styled(Resizable)`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s all;
  cursor: move;

  ::before {
    ${handleCommonStyles}
    content: '◄';
    left: -10px;
    border-radius: 5px 0 0 5px;
    animation: ${fadeSlideLeft} 0.7s ease;
  }

  ::after {
    ${handleCommonStyles}
    content: '►';
    right: -10px;
    border-radius: 0 5px 5px 0;
    animation: ${fadeSlideRight} 0.7s ease;
  }
`

class DatetimeSlider extends React.Component {
  constructor (props) {
    super(props)
    this.numColumns = props.numColumns
    this.defaultSliderColumnSpan = props.defaultSliderColumnSpan
    this.height = props.height
    const columnStart = (this.numColumns - this.defaultSliderColumnSpan) / 2
    this.state = {
      minWidth: 800 / this.numColumns,
      sliderColumnSpan: this.defaultSliderColumnSpan,
      sliderColumnStart: columnStart,
      sliderColumnEnd: columnStart + this.defaultSliderColumnSpan,
      isResizing: false,
      justifySelf: 'start',
      feedback: '',
      startDragPosition: 0,
      dragRate: 0,
      bgPosition: 250,
      data: [
        {name: 'A', uv: 4000, pv: 2400, amt: 2400},
        {name: 'B', uv: 3000, pv: 1398, amt: 2210},
        {name: 'C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'G', uv: 3490, pv: 4300, amt: 2100},
        {name: 'H', uv: 2780, pv: 3908, amt: 2000},
        {name: 'I', uv: 1890, pv: 4800, amt: 2181},
        {name: 'J', uv: 2390, pv: 3800, amt: 2500},
        {name: 'K', uv: 3490, pv: 4300, amt: 2100},
        {name: 'L', uv: 1890, pv: 4800, amt: 2181},
        {name: 'M', uv: 2390, pv: 3800, amt: 2500},
        {name: 'N', uv: 3490, pv: 4300, amt: 2100},
        {name: 'O', uv: 2780, pv: 3908, amt: 2000},
        {name: 'P', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Q', uv: 2390, pv: 3800, amt: 2500},
        {name: 'R', uv: 3490, pv: 4300, amt: 2100},
        {name: 'S', uv: 1890, pv: 4800, amt: 2181},
        {name: 'T', uv: 2390, pv: 3800, amt: 2500},
        {name: 'U', uv: 3490, pv: 4300, amt: 2100},
        {name: 'V', uv: 1890, pv: 4800, amt: 2181},
        {name: 'W', uv: 2390, pv: 3800, amt: 2500},
        {name: 'X', uv: 3490, pv: 4300, amt: 2100},
        {name: 'Y', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Z', uv: 1890, pv: 4800, amt: 2181},
        {name: 'M', uv: 2390, pv: 3800, amt: 2500},
        {name: 'N', uv: 3490, pv: 4300, amt: 2100},
        {name: 'O', uv: 2780, pv: 3908, amt: 2000},
        {name: 'P', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Q', uv: 2390, pv: 3800, amt: 2500},
        {name: 'R', uv: 3490, pv: 4300, amt: 2100},
        {name: 'S', uv: 1890, pv: 4800, amt: 2181}
      ]
    }

    this.updateBgPosition = this.updateBgPosition.bind(this)
  }

  componentDidMount () {
    this.setState({
      maxWidth: this.refElem.offsetWidth,
      minWidth: this.refElem.offsetWidth / this.numColumns
    }, () => this.resizable.updateSize({
      width: this.state.minWidth * this.defaultSliderColumnSpan,
      height: this.height
    }))
  }

  getRandomInt (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

  updateBgPosition () {
    if (this.state.dragRate > 0) {
      const newData = this.state.data.slice()
      for (let i = 0; i < Math.ceil(this.state.dragRate * 3); i++) {
        const oldEntry = newData.pop()
        newData.unshift({
          name: oldEntry.name,
          uv: this.getRandomInt(500, 6000),
          pv: this.getRandomInt(500, 6000),
          amt: this.getRandomInt(500, 6000)
        })
      }
      this.setState({
        data: newData
      })
    } else if (this.state.dragRate < 0) {
      const newData = this.state.data.slice()
      for (let i = 0; i < Math.ceil(this.state.dragRate * -3); i++) {
        const oldEntry = newData.shift()
        newData.push({
          name: oldEntry.name,
          uv: this.getRandomInt(500, 6000),
          pv: this.getRandomInt(500, 6000),
          amt: this.getRandomInt(500, 6000)
        })
      }
      this.setState({
        data: newData
      })
    } else {
      // clearInterval(this.timer)
    }
    // this.setState(s => ({
    //   bgPosition: s.bgPosition - 5 * s.dragRate

    // }))
  }

  render () {
    const style = {
      justifySelf: this.state.justifySelf,
      gridColumnStart: this.state.sliderColumnStart,
      gridColumnEnd: this.state.sliderColumnEnd,
      borderRight: this.state.isResizing ? 'solid 1px #888' : 'none',
      borderLeft: this.state.isResizing ? 'solid 1px #888' : 'none'
    }

    return (
      <Stack innerRef={e => (this.refElem = e)} height={this.height + 30}>
        <ChartWrapper bgPosition={this.state.bgPosition}>
          <AreaChart width={this.state.maxWidth + 30} height={this.height + 30} data={this.state.data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="name" interval={0}/>
            <YAxis domain={[0, 16000]} hide={true}/>
            <Area type='monotone' dataKey='uv' stackId="1" stroke='#8884d8' fill='#8884d8' isAnimationActive={false} />
            <Area type='monotone' dataKey='pv' stackId="1" stroke='#82ca9d' fill='#82ca9d' isAnimationActive={false}/>
            <Area type='monotone' dataKey='amt' stackId="1" stroke='#ffc658' fill='#ffc658' isAnimationActive={false} />
          </AreaChart>
        </ChartWrapper>
        <Grid columnSize={this.state.minWidth}>
          <Overlay isResizing={this.state.isResizing} left={true} columnStart={1} columnEnd={this.state.sliderColumnStart}/>
          <DraggableCore
            onStart={(e, {node, x, deltaX, lastX}) => {
              if (!this.state.isResizing) {
                this.setState({ startDragPosition: x })
                clearInterval(this.timer)
                this.timer = setInterval(this.updateBgPosition, 100)
              }
            }}
            onDrag={(e, {node, x, deltaX, lastX}) =>
              !this.state.isResizing && this.setState(s => ({
                dragRate: (s.startDragPosition - x) / s.startDragPosition
              }))}
            onStop={(e, {node, x, deltaX, lastX}) => {
              this.setState({ dragRate: 0 })
              clearInterval(this.timer)
            }}>
            <StyledResizable
              innerRef={c => (this.resizable = c)}
              style={style}
              handleStyles={{
                right: {width: '14px', right: '-7px'},
                left: {width: '14px', left: '-7px'}
              }}
              defaultSize={{
                width: this.state.minWidth * this.defaultSliderColumnSpan,
                height: this.height
              }}
              grid={[this.state.minWidth, 1]}
              minWidth={this.state.minWidth}
              maxWidth={this.state.maxWidth}
              enable={{
                top: false,
                right: true,
                bottom: false,
                left: true,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false
              }}
              onResizeStart={(e, dir, refToElement) => {
                this.setState({
                  justifySelf: 'center',
                  isResizing: true
                })
              }}
              onResize={(e, dir, refToElement, delta) => {
                const newSpan = Math.round(delta.width / this.state.minWidth) + this.state.sliderColumnSpan
                this.setState({
                  feedback: newSpan
                })
              }}
              onResizeStop={(e, dir, refToElement, delta) => {
                const newSpan = Math.round(delta.width / this.state.minWidth) + this.state.sliderColumnSpan
                const columnStart = Math.round((this.numColumns - newSpan) / 2) + 1
                this.setState({
                  sliderColumnSpan: newSpan,
                  sliderColumnStart: columnStart,
                  sliderColumnEnd: columnStart + newSpan,
                  justifySelf: 'start',
                  feedback: '',
                  isResizing: false
                })
              }}>
              <Feedback showFeedback={this.state.feedback}>{this.state.feedback}</Feedback>
            </StyledResizable>
          </DraggableCore>
          <Overlay isResizing={this.state.isResizing} left={false} columnStart={this.state.sliderColumnEnd} columnEnd={33}/>
        </Grid>
      </Stack>
    )
  }
}

DatetimeSlider.propTypes = {
  numColumns: PropTypes.number,
  defaultSliderColumnSpan: PropTypes.number,
  height: PropTypes.number
}

DatetimeSlider.defaultProps = {
  numColumns: 32,
  defaultSliderColumnSpan: 4,
  height: 200
}

export default DatetimeSlider
