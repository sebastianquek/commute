export const mapStyleSelector = state => state.map.mapStyle
export const hoveredZoneSelector = state => state.map.currentZone
export const isHoveredZoneSelectedSelector = state => hoveredZoneSelector(state).isSelected
