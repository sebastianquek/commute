import React, { Component } from 'react'
import PropTypes from 'prop-types'
import JourneyInfoTooltip from './JourneyInfoTooltip'

export class RouteChoiceChart extends Component {
  componentWillReceiveProps (newProps) {
    console.log(newProps.journeys)
    this.zoneIdToGroupId = {}
    this.data = { nodes: [], links: [] }

    // Populate mapping of zone id to group id
    Object.keys(newProps.journeys).forEach(groupId => {
      const { groupData } = newProps.journeys[groupId]
      groupData.map(d => d.zoneId)
        .forEach(zoneId => (this.zoneIdToGroupId[zoneId] = Number(groupId)))
    })

    // Populate links
    Object.keys(newProps.journeys).forEach(groupId => {
      const { color, groupData } = newProps.journeys[groupId]
      groupData.forEach(({ zoneId, zoneData }) => {
        zoneData && zoneData.forEach(journey => {
          const { originZone, destinationZone, ...rest } = journey
          this.data.links.push({
            ...rest,
            color,
            originZone: originZone || zoneId,
            destinationZone: destinationZone || zoneId,
            source: originZone ? (this.zoneIdToGroupId[originZone] || originZone) : Number(groupId),
            target: destinationZone ? (this.zoneIdToGroupId[destinationZone] || destinationZone) : Number(groupId)
          })
        })
      })
    })

    console.log(this.zoneIdToGroupId)
    console.log(this.data.links)
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}

RouteChoiceChart.propTypes = {
  journeys: PropTypes.object
}

export default RouteChoiceChart
