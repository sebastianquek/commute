import { connect } from 'react-redux'
import GroupCategory from '../components/GroupCategory'
import { destinationGroupIdsAndColorsSelector, originGroupIdsSelector } from '../selectors'
import { setDestinationSelectionMode } from '../actions'

const mapStateToProps = state => ({
  groups: destinationGroupIdsAndColorsSelector(state),
  category: 'destinations',
  initialIdx: originGroupIdsSelector(state).length
})

const mapDispatchToProps = {
  onClickAdd: setDestinationSelectionMode
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupCategory)
