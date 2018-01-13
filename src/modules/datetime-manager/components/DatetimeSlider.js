import React from 'react'
import styled from 'styled-components'
import ChartsContainer from '../containers/ChartsContainer'
import BrushesContainer from '../containers/BrushesContainer'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`

class DatetimeSlider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  updateDimensions () {
    this.setState({
      width: this.ref.getBoundingClientRect().width,
      height: this.ref.getBoundingClientRect().height
    })
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)
    this.updateDimensions()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  render () {
    return (
      <Wrapper innerRef={ref => (this.ref = ref)}>
        <ChartsContainer width={this.state.width} height={this.state.height}/>
        <BrushesContainer width={this.state.width} height={this.state.height}/>
      </Wrapper>
    )
  }
}

export default DatetimeSlider
