import React from 'react'
import PropTypes from 'prop-types'
import ScrollableAnchor from 'react-scrollable-anchor'
import styled from 'styled-components'
import ZoneDataRow from './ZoneDataRow'
import ZoneFeedback from './ZoneFeedback'
import Subheader from '../../core/components/Subheader'
import SelectedZoneDataRowContent from './SelectedZoneDataRowContent'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  & > *:first-child {
    margin-left: 1.5rem;
  }
`

const SubgraphList = (props) => {
  const keys = Object.keys(props.subgraphCompositions)
  let subgraphs = keys.map((key, idx) => {
    const group = props.subgraphCompositions[key]
    let zoneName = ''
    if (group.groupData[0] && group.groupData[0].zoneData) {
      zoneName = group.groupData[0].zoneData['SUBZONE_N']
    }
    return (
      <ScrollableAnchor key={key} id={'' + key}>
        <ZoneDataRow
          zoneName={zoneName}
          zoneNum={String.fromCharCode('A'.charCodeAt() + idx)}
          zoneColor={group.hidden ? '#ddd' : group.color}
          dottedBorder={group.hidden}
          roundedSquare
        >
          <SelectedZoneDataRowContent
            composition={group.groupData}
          />
        </ZoneDataRow>
      </ScrollableAnchor>
    )
  })

  return (
    <Wrapper>
      <Subheader>Identified subgraphs</Subheader>
      {
        subgraphs.length > 0
          ? subgraphs
          : <ZoneFeedback
            zoneDataContainer={<ZoneDataRow roundedSquare/>}
            feedback={`Details of subgraphs that were found will appear here`}
          />
      }
    </Wrapper>
  )
}

SubgraphList.propTypes = {
  subgraphCompositions: PropTypes.object
}

export default SubgraphList
