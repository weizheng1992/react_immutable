import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as detailsCreators from "../actions/details";

import WebView from "../pages/skuDetail/webView";

class WebViewContainer extends React.Component {
  render() {
    return <WebView {...this.props} />;
  }
}

// const SkuDetailContainer = ({ props }) => <SkuDetail {...props} />;

const mapStateToProps = state => {
    console.log(state);
  const { detial } = state;
  return {
    detial
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    ""
  )(WebViewContainer)
);
