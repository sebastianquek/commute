import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import RouteChoiceChart from './RouteChoiceChart'
import JourneyInfoTooltip from './JourneyInfoTooltip'

const Wrapper = styled.div`
  position: relative;
`

// Contains the chart and tooltip
class RouteChoiceChartManager extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.setTooltipInfo = this.setTooltipInfo.bind(this)
  }

  componentWillReceiveProps (newProps) {
    this.zoneIdToGroupId = {}
    this.nodes = {}
    this.links = []
    this.linksMetadata = {}

    // Populate mapping of zone id to group id
    Object.keys(newProps.routes).forEach(groupId => {
      const { groupData } = newProps.routes[groupId]
      groupData.map(d => d.zoneId)
        .forEach(zoneId => (this.zoneIdToGroupId[zoneId] = Number(groupId)))
    })

    // Populate links and nodes
    Object.keys(newProps.routes).forEach(groupId => {
      const { groupData } = newProps.routes[groupId]
      groupData.forEach(({ zoneId, zoneData }) => {
        zoneData && zoneData.forEach(route => {
          const { originZone, destinationZone, trips, ...rest } = route
          const link = {
            ...rest,
            trips,
            totalDuration: trips.reduce((sum, d) => d.duration + sum, 0),
            originZone: originZone || zoneId,
            destinationZone: destinationZone || zoneId,
            source: originZone ? (this.zoneIdToGroupId[originZone] || originZone) : Number(groupId),
            target: destinationZone ? (this.zoneIdToGroupId[destinationZone] || destinationZone) : Number(groupId)
          }

          link.sourceColor = newProps.zoneIdToGroupColor[link.originZone] || '#ddd'
          link.targetColor = newProps.zoneIdToGroupColor[link.destinationZone] || '#ddd'

          link.originZoneName = newProps.zoneIdToName[link.originZone]
          link.destinationZoneName = newProps.zoneIdToName[link.destinationZone]

          // Add link
          this.links.push(link)
        })
      })
    })

    this.links.forEach(link => {
      const key = link.source < link.target ? `${link.source}-${link.target}` : `${link.target}-${link.source}`
      if (!this.linksMetadata.hasOwnProperty(key)) {
        let sameOD, sameODAlt
        if (link.source < link.target) {
          sameOD = this.links.filter(d => d.source === link.source && d.target === link.target)
          sameODAlt = this.links.filter(d => d.target === link.source && d.source === link.target)
        } else {
          sameODAlt = this.links.filter(d => d.source === link.source && d.target === link.target)
          sameOD = this.links.filter(d => d.target === link.source && d.source === link.target)
        }

        this.linksMetadata[key] = {
          numLinks: sameOD.length + sameODAlt.length,
          counterOD: 0,
          counterODAlt: sameOD.length
        }

        // Add node
        this.nodes[link.source] || (this.nodes[link.source] = {group: link.source, color: link.sourceColor, numLinks: 0})
        this.nodes[link.target] || (this.nodes[link.target] = {group: link.target, color: link.targetColor, numLinks: 0})

        // Update number of links for current source and target nodes
        this.nodes[link.source].numLinks += this.linksMetadata[key].numLinks
        this.nodes[link.target].numLinks += this.linksMetadata[key].numLinks
      }

      if (link.source < link.target) {
        const currentDirectionIdx = ++this.linksMetadata[key].counterOD
        link.direction = currentDirectionIdx > Math.ceil(this.linksMetadata[key].numLinks / 2) ? 1 : 0
        link.linkNum = currentDirectionIdx
      } else {
        const currentDirectionIdx = ++this.linksMetadata[key].counterODAlt
        link.direction = currentDirectionIdx <= Math.ceil(this.linksMetadata[key].numLinks / 2) ? 1 : 0
        link.linkNum = currentDirectionIdx
      }

      // Use nodes data as source and target
      link.source = this.nodes[link.source]
      link.target = this.nodes[link.target]
    })

    // Convert nodes object to array
    this.nodes = Object.values(this.nodes)
  }

  setTooltipInfo (link, x, y) {
    if (!link) {
      this.setState({isTooltipHidden: true})
    } else {
      this.setState({
        link, x, y, isTooltipHidden: false
      })
    }
  }

  render () {
    return (
      <Wrapper>
        <RouteChoiceChart
          links={this.links}
          nodes={this.nodes}
          linksMetadata={this.linksMetadata}
          setTooltipInfo={this.setTooltipInfo}
        />
        {
          this.state.link &&
          <JourneyInfoTooltip
            link={this.state.link}
            x={this.state.x}
            y={this.state.y}
            hidden={this.state.isTooltipHidden}
          />
        }
      </Wrapper>
    )
  }
}

RouteChoiceChartManager.propTypes = {
  routes: PropTypes.object.isRequired,
  zoneIdToGroupColor: PropTypes.object.isRequired,
  zoneIdToName: PropTypes.object.isRequired
}

export default RouteChoiceChartManager
