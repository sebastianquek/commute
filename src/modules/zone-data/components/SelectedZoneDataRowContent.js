import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash.get'
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
  for (let i = 0; i < props.composition.length; i++) {
    const id = get(props.composition, [i, 'zoneData', 'objectid'], '')
    const mainDetail = get(props.composition, [i, 'zoneData', 'lu_desc'], '')
    const subDetail = get(props.composition, [i, 'zoneData', 'subzone_n'], '')
    temp.push(
      <ZoneDetails key={i} mainDetail={mainDetail} subDetail={`${subDetail} — ${id}`} />
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
