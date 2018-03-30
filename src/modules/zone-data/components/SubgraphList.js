import React from 'react'
import PropTypes from 'prop-types'
import ScrollableAnchor from 'react-scrollable-anchor'
import styled from 'styled-components'
import ZoneDataRow from './ZoneDataRow'
import Subheader from '../../core/components/Subheader'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  & > *:first-child {
    margin-left: 1.5rem;
  }
`

const SubgraphList = () => {
  const subgraphs = []
  for (let i = 0; i < 5; i++) {
    subgraphs.push(
      <ScrollableAnchor key={i} id={'s' + i}>
        <ZoneDataRow
          zoneName='TESTING'
          zoneNum={'A'}
          roundedSquare
        >

        </ZoneDataRow>
      </ScrollableAnchor>
    )
  }
  return (
    <Wrapper>
      <Subheader>Identified subgraphs</Subheader>
      {subgraphs}
    </Wrapper>
  )
}

SubgraphList.propTypes = {

}

export default SubgraphList
