import React from 'react'
import PropTypes from 'prop-types'
import Resizable from 're-resizable'
import {DraggableCore} from 'react-draggable'
import styled from 'styled-components'
import {fadeSlideLeft, fadeSlideRight} from '../../../../utils/animations'

const Stack = styled.div`
  position: relative;
  height: 200px;
`

const ChartWrapper = styled.div.attrs({
  style: ({bgPosition}) => ({
    backgroundPosition: bgPosition + '% 100%'
  })
})`
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
  background-size: 800% 100%;
 
  width: 100%;
  height: 100%;
`

const Grid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(32, ${({columnSize}) => columnSize}px);
`

const Feedback = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.6);
  color: #555;
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

const StyledResizable = styled(Resizable)`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s all;
  cursor: move;

  ::before {
    display: flex;
    align-items: center;
    justify-content: center;
    content: '◄';
    position: absolute;
    font-size: 0.5em;
    left: -10px;
    height: 40px;
    width: 10px;
    color: #888;
    background: rgba(255,255,255,0.6);
    border-radius: 5px 0 0 5px;
    animation: ${fadeSlideLeft} 0.7s ease;
  }

  ::after {
    display: flex;
    align-items: center;
    justify-content: center;
    content: '►';
    position: absolute;
    font-size: 0.5em;
    right: -10px;
    height: 40px;
    width: 10px;
    color: #888;
    background: rgba(255,255,255,0.6);
    border-radius: 0 5px 5px 0;
    pointer-events: none;
    animation: ${fadeSlideRight} 0.7s ease;
  }
`

class DatetimeSlider extends React.Component {
  constructor (props) {
    super(props)
    this.numColumns = 32
    this.defaultSliderColumnSpan = 4
    this.state = {
      minWidth: 800 / this.numColumns,
      sliderColumnSpan: this.defaultSliderColumnSpan,
      sliderColumnStart: (this.numColumns - this.defaultSliderColumnSpan) / 2,
      sliderColumnEnd: (this.numColumns - this.defaultSliderColumnSpan) / 2 + this.defaultSliderColumnSpan,
      isResizing: false,
      justifySelf: 'start',
      feedback: '',
      startDragPosition: 0,
      dragRate: 0,
      bgPosition: 250
    }

    this.updateBgPosition = this.updateBgPosition.bind(this)
  }

  componentDidMount () {
    this.setState({
      maxWidth: this.refElem.offsetWidth,
      minWidth: this.refElem.offsetWidth / this.numColumns
    }, () => this.resizable.updateSize({
      width: this.state.minWidth * this.defaultSliderColumnSpan,
      height: 200
    }))
  }

  updateBgPosition () {
    this.setState(s => ({
      bgPosition: s.bgPosition - 5 * s.dragRate
    }))
  }

  render () {
    const style = {
      justifySelf: this.state.justifySelf,
      gridColumnStart: this.state.sliderColumnStart,
      gridColumnEnd: this.state.sliderColumnEnd,
      borderRight: this.state.isResizing ? 'solid 1px white' : 'none',
      borderLeft: this.state.isResizing ? 'solid 1px white' : 'none'
    }

    return (
      <Stack innerRef={e => (this.refElem = e)}>
        <ChartWrapper bgPosition={this.state.bgPosition}/>
        <Grid columnSize={this.state.minWidth}>
          <Overlay isResizing={this.state.isResizing} left={true} columnStart={1} columnEnd={this.state.sliderColumnStart}/>
          <DraggableCore
            onStart={(e, {node, x, deltaX, lastX}) => {
              !this.state.isResizing && this.setState({startDragPosition: x})
              clearInterval(this.timer)
              this.timer = setInterval(this.updateBgPosition, 30)
            }}
            onDrag={(e, {node, x, deltaX, lastX}) =>
              !this.state.isResizing && this.setState(s => ({
                dragRate: (s.startDragPosition - x) / s.startDragPosition
              }))}
            onStop={(e, {node, x, deltaX, lastX}) => {
              this.setState({
                dragRate: 0
              })
              clearInterval(this.timer)
            }}>
            <StyledResizable
              innerRef={c => { this.resizable = c }}
              style={style}
              handleStyles={{right: {width: '14px', right: '-7px'}, left: {width: '14px', left: '-7px'}}}
              defaultSize={{
                width: this.state.minWidth * this.defaultSliderColumnSpan,
                height: 200
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
                  justifySelf: dir === 'left' ? 'end' : 'start',
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

}

export default DatetimeSlider
