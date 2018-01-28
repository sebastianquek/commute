import { connect } from 'react-redux'
import GroupCategory from '../components/GroupCategory'
import { originGroupIdsAndColorsSelector } from '../selectors'
import { setOriginSelectionMode } from '../actions'

const mapStateToProps = state => ({
  groups: originGroupIdsAndColorsSelector(state),
  category: 'origins'
})

const mapDispatchToProps = {
  onClickAdd: setOriginSelectionMode
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupCategory)
