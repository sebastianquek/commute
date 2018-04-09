import React from 'react'
import PropTypes from 'prop-types'
import ScrollableAnchor from 'react-scrollable-anchor'
import ZoneDataRow from './ZoneDataRow'
import ZoneFeedback from './ZoneFeedback'
import SelectedZoneDataRowContent from './SelectedZoneDataRowContent'

const SelectedZonesDataRows = (props) => {
  const keys = Object.keys(props.zoneCompositions)
  if (keys.length > 0) {
    return keys.map((key, idx) => {
      const group = props.zoneCompositions[key]
      let zoneName = ''
      if (group.groupData[0] && group.groupData[0].zoneData) {
        zoneName = group.groupData[0].zoneData['subzone_n']
      }
      return (
        <ScrollableAnchor key={key} id={'' + key}>
          <ZoneDataRow
            zoneName={zoneName}
            zoneNum={props.initialIdx + idx + 1}
            zoneColor={group.color}
            circle
          >
            <SelectedZoneDataRowContent
              composition={group.groupData}
            />
          </ZoneDataRow>
        </ScrollableAnchor>
      )
    })
  } else {
    return <ZoneFeedback
      zoneDataContainer={<ZoneDataRow circle />}
      feedback={`Select a ${props.category} zone to see more details`} />
  }
}

SelectedZonesDataRows.propTypes = {
  zoneCompositions: PropTypes.object,
  zoneJourneys: PropTypes.object,
  initialIdx: PropTypes.number,
  category: PropTypes.string
}

SelectedZonesDataRows.defaultProps = {
  initialIdx: 0
}

export default SelectedZonesDataRows
