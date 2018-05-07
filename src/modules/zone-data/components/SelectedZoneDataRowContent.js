import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash.get'
import orderBy from 'lodash.orderby'
import Subheader from '../../core/components/Subheader'
import ZoneDetails from '../../core/components/ZoneDetails'

const Section = styled.div`
  margin-bottom: 1em;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 0.4em 1em;
`

const SelectedZoneDataRowContent = (props) => {
  let temp = []
  const composition = orderBy(props.composition, ['zoneData.lu_desc', 'zoneData.objectid'])
  for (let i = 0; i < composition.length; i++) {
    const id = get(composition, [i, 'zoneData', 'objectid'], '')
    const desc = get(composition, [i, 'zoneData', 'lu_desc'], '')
    const name = get(composition, [i, 'zoneData', 'subzone_n'], '')
    temp.push(
      <ZoneDetails key={i} mainDetail={desc} subDetail={`${name} — ${id}`} />
    )
  }
  return (
    <div>
      <Subheader>Composition</Subheader>
      <Section>
        <Grid>
          {temp}
        </Grid>
      </Section>
    </div>
  )
}

SelectedZoneDataRowContent.propTypes = {
  composition: PropTypes.array
}

export default SelectedZoneDataRowContent
