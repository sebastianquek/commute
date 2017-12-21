import React from 'react'
import PropTypes from 'prop-types'
import Resizable from 're-resizable'
import styled from 'styled-components'
import {fadeSlideUp} from '../../../../utils/animations'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(32, ${({columnSize}) => columnSize}px);
`

const Feedback = styled.span`
  transition: 0.2s all;
  animation: ${fadeSlideUp};
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
      justifySelf: 'start',
      feedback: ''
    }
  }

  componentDidMount () {
    this.setState({
      maxWidth: this.refElem.offsetWidth,
      minWidth: this.refElem.offsetWidth / this.numColumns
    })
  }

  render () {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'solid 1px #ddd',
      background: 'transparent',
      justifySelf: this.state.justifySelf,
      gridColumnStart: this.state.sliderColumnStart,
      gridColumnEnd: this.state.sliderColumnEnd,
      transition: '0.1s all'
    }

    return (
      <Grid innerRef={e => (this.refElem = e)} columnSize={this.state.minWidth}>
        <Resizable
          style={style}
          defaultSize={{
            width: this.state.minWidth * this.defaultSliderColumnSpan,
            height: 200
          }}
          grid={[this.state.minWidth, 1]}
          minWidth={this.state.minWidth}
          maxWidth={this.state.maxWidth}
          bounds='parent'
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
              justifySelf: dir === 'left' ? 'end' : 'start'
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
            this.setState({
              sliderColumnSpan: newSpan,
              sliderColumnStart: Math.round((this.numColumns - newSpan) / 2),
              sliderColumnEnd: Math.round((this.numColumns - newSpan) / 2) + newSpan,
              justifySelf: 'start',
              feedback: ''
            })
          }}>
          <Feedback>{this.state.feedback}</Feedback>
        </Resizable>
      </Grid>
    )
  }
}

DatetimeSlider.propTypes = {

}

export default DatetimeSlider
