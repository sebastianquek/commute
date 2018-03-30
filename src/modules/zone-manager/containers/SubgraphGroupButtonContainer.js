import { connect } from 'react-redux'
import { goToAnchor } from 'react-scrollable-anchor'
import SubgraphGroupButton from '../components/SubgraphGroupButton'
import {
  removeSubgraphGroup, showSubgraphGroup, hideSubgraphGroup
} from '../actions'

const mapStateToProps = (state, ownProps) => ownProps

const mapDispatchToProps = dispatch => ({
  onClick: groupId => goToAnchor('subgraph-' + groupId, false),
  onClickShow: groupId => dispatch(showSubgraphGroup(groupId)),
  onClickHide: groupId => dispatch(hideSubgraphGroup(groupId)),
  onClickDelete: groupId => dispatch(removeSubgraphGroup(groupId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubgraphGroupButton)
