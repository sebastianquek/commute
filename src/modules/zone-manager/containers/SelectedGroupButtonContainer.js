import { connect } from 'react-redux'
import { goToAnchor } from 'react-scrollable-anchor'
import SelectedGroupButton from '../components/SelectedGroupButton'
import {
  setEditingGroupId, setEditSelectionMode, removeGroup
} from '../actions'

const mapStateToProps = (state, ownProps) => ownProps

const mapDispatchToProps = dispatch => ({
  onClick: (groupId) => goToAnchor('' + groupId, false),
  onClickEdit: (groupId) => {
    dispatch(setEditingGroupId(groupId))
    dispatch(setEditSelectionMode())
    goToAnchor('' + groupId, false)
  },
  onClickDelete: () => dispatch(removeGroup())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedGroupButton)
