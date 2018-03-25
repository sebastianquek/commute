import React from 'react'
import styled from 'styled-components'
import OriginsCategoryContainer from '../containers/OriginsCategoryContainer'
import DestinationsCategoryContainer from '../containers/DestinationsCategoryContainer'

const FixedWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 2;
`

const Border = styled.div`
  position: absolute;
  top: 0;
  width: ${({isScrollbarVisible}) => isScrollbarVisible ? '6.5rem' : '5.5rem'};
  border-right: 1px solid ${({theme}) => theme.colors.borderSecondary};
  background: white;
  height: 100%;
  z-index: -1;
  transition: 0.4s;
`

const ScrollWrapper = styled.div`
  height: ${({theme}) => `calc(100vh - ${theme.dimensions.bottomBarHeight})`};
  direction: rtl;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0.8em 0.6em 0.8em 0.6em;
  overflow: auto;

  * {
    direction: ltr;
    flex-shrink: 0;
  }
`

class ZoneManager extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isScrollbarVisible: false
    }
    this.updateScrollbarVisbility = this.updateScrollbarVisbility.bind(this)
  }

  componentDidMount () {
    this.updateScrollbarVisbility()
  }

  updateScrollbarVisbility () {
    if (this.scrollRef) {
      const isScrollbarVisible = this.scrollRef.scrollHeight > this.scrollRef.clientHeight
      if (isScrollbarVisible !== this.state.isScrollbarVisible) {
        this.setState({
          isScrollbarVisible
        })
      }
    }
  }

  render () {
    return (
      <FixedWrapper>
        <Border {...this.state}/>
        <ScrollWrapper innerRef={ref => (this.scrollRef = ref)}>
          <OriginsCategoryContainer updateScrollbarVisbility={this.updateScrollbarVisbility}/>
          <DestinationsCategoryContainer updateScrollbarVisbility={this.updateScrollbarVisbility}/>
        </ScrollWrapper>
      </FixedWrapper>
    )
  }
}

export default ZoneManager
