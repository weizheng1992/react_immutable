import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as detailsCreators from "../actions/details";

import SkuDetail from "../pages/skuDetail";

class SkuDetailContainer extends React.Component {
  render() {
    return <SkuDetail {...this.props} />;
  }
}

// const SkuDetailContainer = ({ props }) => <SkuDetail {...props} />;

const mapDispatchToProps = dispatch => {
  const skuDetialActions = bindActionCreators(detailsCreators, dispatch);
  return {
    skuDetialActions
  };
};

export default withRouter(
  connect(
    "",
    mapDispatchToProps
  )(SkuDetailContainer)
);
