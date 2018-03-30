import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Subheader from '../../core/components/Subheader'
import ZoneDetails from '../../core/components/ZoneDetails'
import Spinner from '../../core/components/Spinner'

const Wrapper = styled.div`
  padding: 0.4rem 1.7rem 0 1.5rem;
  font-family: Barlow, sans-serif;
  color: ${({theme}) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
`

const LandUseTypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 0.2em 1em;
`

const SelectLandUseButton = styled.button`
  background-color: transparent;
  color: ${({theme}) => theme.colors.textPrimary};
  font-family: inherit;
  font-size: inherit;
  text-align: left;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;
  &:hover {
    border: 1px solid #4a90e2;
  }

  ${({selected}) => selected && css`
    background-color: #4a90e2;
    border-color: #4a90e2;
    color: white;
  `}
`

const SubmitButton = styled.button`
  background-color: transparent;
  color: ${({theme}) => theme.colors.textPrimary};
  font-family: inherit;
  font-size: ${({theme}) => theme.typography.headerSize};
  letter-spacing: 0.05em;
  font-weight: 700;
  border: 1px solid #4a90e2;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;
  padding: 0.5em 0.8em;
  align-self: flex-end;
  margin-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 140px;

  ${({disabled}) => !disabled && css`
    &:hover {
      background-color: #4a90e2;
      color: white;
    }
  `}

  ${({disabled}) => disabled && css`
    border-color: #bbb;
    color: #bbb;
    cursor: auto;
  `}
`

class SubgraphSelection extends Component {
  static landUseTypes = {
    'AGRICULTURE': 'AG',
    'BEACH AREA': 'BA',
    'BUSINESS': 'BZ',
    'BUSINESS PARK': 'BP',
    'CEMETERY': 'CE',
    'CIVIC & COMMUNITY INSTITUTION': 'CI',
    'COMMERCIAL & RESIDENTIAL': 'CM',
    'EDUCATIONAL INSTITUTION': 'ED',
    'HEALTH & MEDICAL CARE': 'HE',
    'HOTEL': 'HO',
    'MASS RAPID TRANSIT': 'RT',
    'OPEN SPACE': 'OS',
    'PARK': 'PK',
    'PLACE OF WORSHIP': 'PW',
    'PORT / AIRPORT': 'PA',
    'RESERVE SITE': 'RS',
    'RESIDENTIAL': 'RE',
    'ROAD': 'RO',
    'SPECIAL USE': 'SU',
    'SPORTS & RECREATION': 'SP',
    'TRANSPORT FACILITIES': 'TF',
    'UTILITY': 'UT',
    'WATERBODY': 'WA',
    'WHITE': 'WH'
  }

  state = {
    selectedLandUse: ['AG']
  }

  handleSelectLandUse (id) {
    const selectedLandUse = [...this.state.selectedLandUse]
    if (selectedLandUse.includes(id)) {
      selectedLandUse.splice(selectedLandUse.indexOf(id), 1)
    } else {
      selectedLandUse.push(id)
    }
    this.setState({
      selectedLandUse
    })
  }

  render () {
    const checkboxes = Object.entries(SubgraphSelection.landUseTypes)
      .map(([desc, id]) => {
        return (
          <SelectLandUseButton
            key={id}
            selected={this.state.selectedLandUse.includes(id)}
            onClick={() => this.handleSelectLandUse(id)}
          >
            <ZoneDetails mainDetail={desc} small={true} wrap={true}/>
          </SelectLandUseButton>
        )
      })
    return (
      <Wrapper>
        <Subheader>Land use types</Subheader>
        <LandUseTypesGrid>
          {checkboxes}
        </LandUseTypesGrid>
        <SubmitButton
          disabled={this.state.selectedLandUse.length === 0}
          title={this.state.selectedLandUse.length === 0 && 'Please select a land use type'}
        >
          {this.props.isFetchingSubgraphs ? <Spinner /> : 'Find Subgraphs'}
        </SubmitButton>
      </Wrapper>
    )
  }
}

SubgraphSelection.propTypes = {
  isFetchingSubgraphs: PropTypes.bool
}

SubgraphSelection.defaultProps = {
  isFetchingSubgraphs: false
}

export default SubgraphSelection
