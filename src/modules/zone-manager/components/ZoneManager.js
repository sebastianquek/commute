import React from 'react'
import styled from 'styled-components'
import OriginsCategoryContainer from '../containers/OriginsCategoryContainer'
import DestinationsCategoryContainer from '../containers/DestinationsCategoryContainer'

const FixedWrapper = styled.div`
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  z-index: 2;
`

const Border = styled.div`
  background: white;
  border-right: 1px solid ${({theme}) => theme.colors.borderSecondary};
  height: 100%;
  position: absolute;
  top: 0;
  transition: 0.4s;
  width: ${({isScrollbarVisible}) => isScrollbarVisible ? '6.5rem' : '5.5rem'};
  z-index: -1;
`

const ScrollWrapper = styled.div`
  align-items: flex-end;
  direction: rtl;
  display: flex;
  flex-direction: column;
  height: ${({theme}) => `calc(100vh - ${theme.dimensions.bottomBarHeight})`};
  overflow: auto;
  padding: 0.8em 0.6em 0.8em 0.6em;

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
