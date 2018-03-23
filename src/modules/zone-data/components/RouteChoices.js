import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RangeSlider, Checkbox } from '@blueprintjs/core'
import RouteChoicesChartManager from './RouteChoicesChartManager'
import Subheader from '../../core/components/Subheader'

const Wrapper = styled.div`
  padding: 0.4rem 1.7rem 0 1.5rem;
  font-family: Barlow, sans-serif;
`

const Controls = styled.div`
  .pt-slider {
    width: 100%;
    min-width: 150px;
    height: 40px;
    position: relative;
    outline: none;
    cursor: default;
    margin-bottom: 0.6em;
    user-select: none; }
    .pt-slider:hover {
      cursor: pointer; }
    .pt-slider:active {
      cursor: grabbing; }
    .pt-slider.pt-disabled {
      opacity: 0.5;
      cursor: not-allowed; }
    .pt-slider.pt-slider-unlabeled {
      height: 16px; }

  .pt-slider-track,
  .pt-slider-progress {
    top: 5px;
    right: 0;
    left: 0;
    height: 6px;
    position: absolute;
    border-radius: 3px;
    background: rgba(92, 112, 128, 0.2);
  }

  .pt-slider-progress {
    background: #4a90e2; }

  .pt-slider-handle {
    box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 -1px 0 rgba(16, 22, 26, 0.1);
    background-color: #f5f8fa;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
    color: #182026;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.2), 0 1px 1px rgba(16, 22, 26, 0.2);
    cursor: pointer;
    width: 16px;
    height: 16px; }
    .pt-slider-handle:hover {
      box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 -1px 0 rgba(16, 22, 26, 0.1);
      background-clip: padding-box;
      background-color: #ebf1f5; }
    .pt-slider-handle:active, .pt-slider-handle.pt-active {
      box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 1px 2px rgba(16, 22, 26, 0.2);
      background-color: #d8e1e8;
      background-image: none; }
    .pt-slider-handle:disabled, .pt-slider-handle.pt-disabled {
      outline: none;
      box-shadow: none;
      background-color: rgba(206, 217, 224, 0.5);
      background-image: none;
      cursor: not-allowed;
      color: rgba(92, 112, 128, 0.5); }
      .pt-slider-handle:disabled.pt-active, .pt-slider-handle:disabled.pt-active:hover, .pt-slider-handle.pt-disabled.pt-active, .pt-slider-handle.pt-disabled.pt-active:hover {
        background: rgba(206, 217, 224, 0.7); }
    .pt-slider-handle:focus {
      z-index: 1; }
    .pt-slider-handle:hover {
      box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 -1px 0 rgba(16, 22, 26, 0.1);
      background-clip: padding-box;
      background-color: #ebf1f5;
      z-index: 2;
      box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.2), 0 1px 1px rgba(16, 22, 26, 0.2);
      cursor: grab; }
    .pt-slider-handle.pt-active {
      box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 1px 2px rgba(16, 22, 26, 0.2);
      background-color: #d8e1e8;
      background-image: none;
      box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 1px 1px rgba(16, 22, 26, 0.1);
      cursor: grabbing; }
    .pt-disabled .pt-slider-handle {
      box-shadow: none;
      background: #bfccd6;
      pointer-events: none; }
    .pt-slider-handle .pt-slider-label {
      margin-left: 8px;
      border-radius: 3px;
      // box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2), 0 8px 24px rgba(16, 22, 26, 0.2);
      background: #394b59;
      color: #f5f8fa; }
      .pt-disabled .pt-slider-handle .pt-slider-label {
        box-shadow: none; }

  .pt-slider-label {
    transform: translate(-50%, 20px);
    display: inline-block;
    position: absolute;
    padding: 2px 5px;
    vertical-align: top;
    line-height: 1;
    font-size: 12px; }

  .pt-range-slider .pt-slider-handle {
    width: 8px; }
    .pt-range-slider .pt-slider-handle:first-of-type {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0; }
    .pt-range-slider .pt-slider-handle:last-of-type {
      margin-left: 8px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0; }
      .pt-range-slider .pt-slider-handle:last-of-type .pt-slider-label {
        margin-left: 0; }

  .pt-range-slider .pt-slider-progress {
    border-radius: 0; }
`

class RouteChoices extends Component {
  constructor (props) {
    super(props)
    this.handleDurationChange = this.handleDurationChange.bind(this)
    this.handleNumCommutersChange = this.handleNumCommutersChange.bind(this)
    this.handleIncludeMrtToggle = this.handleIncludeMrtToggle.bind(this)
    this.handleIncludeBusToggle = this.handleIncludeBusToggle.bind(this)
  }

  handleDurationChange (duration) {
    this.props.filterDuration(duration)
  }

  handleNumCommutersChange (numCommuters) {
    this.props.filterNumCommuters(numCommuters)
  }

  handleIncludeMrtToggle () {
    this.props.filterModesOfTransport(!this.props.filters.includeMrt, this.props.filters.includeBus)
  }

  handleIncludeBusToggle () {
    this.props.filterModesOfTransport(this.props.filters.includeMrt, !this.props.filters.includeBus)
  }

  render () {
    return (
      <Wrapper>
        <Controls>
          <Subheader>Duration</Subheader>
          <RangeSlider
            min={0}
            max={2 * 60 * 60} // 2 hours
            stepSize={60} // 1 minute
            labelStepSize={2 * 60 * 60 / 5}
            labelRenderer={val => `${Math.round(val / 60)}min${Math.round(val / 60) > 1 ? 's' : ''}`}
            onChange={this.handleDurationChange}
            value={this.props.filters.duration}
          />
          <Subheader>Commuters</Subheader>
          <RangeSlider
            min={0}
            max={100}
            labelStepSize={100 / 5}
            onChange={this.handleNumCommutersChange}
            value={this.props.filters.numCommuters}
          />
          <Subheader>Modes of transport</Subheader>
          <Checkbox checked={this.props.filters.includeMrt} label="MRT" onChange={this.handleIncludeMrtToggle} />
          <Checkbox checked={this.props.filters.includeBus} label="Bus" onChange={this.handleIncludeBusToggle} />
        </Controls>
        <div>
          <RouteChoicesChartManager {...this.props} />
        </div>
      </Wrapper>
    )
  }
}

RouteChoices.propTypes = {
  routes: PropTypes.object.isRequired,
  zoneIdToGroupColor: PropTypes.object.isRequired,
  zoneIdToName: PropTypes.object.isRequired,
  shouldUpdate: PropTypes.bool.isRequired,
  isFetchingZoneJourneyData: PropTypes.bool.isRequired,
  filters: PropTypes.object.isRequired,
  resetForceRouteChoicesChartUpdate: PropTypes.func.isRequired,
  filterNumCommuters: PropTypes.func.isRequired,
  filterDuration: PropTypes.func.isRequired,
  filterModesOfTransport: PropTypes.func.isRequired
}

export default RouteChoices
