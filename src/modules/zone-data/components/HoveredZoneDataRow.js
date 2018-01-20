import React from 'react'
import PropTypes from 'prop-types'
import ZoneDataRow from './ZoneDataRow'
import ZoneFeedback from './ZoneFeedback'

const HoveredZoneDataRow = (props) => {
  if (props.zoneComposition) {
    return (
      <ZoneDataRow
        zoneName={props.zoneComposition.SUBZONE_N}
        dottedBorder>
        {JSON.stringify(props.zoneComposition)}
      </ZoneDataRow>
    )
  } else {
    return <ZoneFeedback
      zoneDataContainer={<ZoneDataRow dottedBorder />}
      feedback='Hover over a zone to see its land use' />
  }
}

HoveredZoneDataRow.propTypes = {
  zoneComposition: PropTypes.object
}

export default HoveredZoneDataRow
