import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as detailsCreators from "../actions/home";

import Home from "../pages/home";

class HomeContainer extends React.Component {
  render() {
    return <Home {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    home: {
      loading: state.getIn(["home", "loading"]),
      entries: state.getIn(["home", "entries"]),
      recommend: state.getIn(["home", "recommend"]),
      banners: state.getIn(["home", "banners"]),
      restaurants:state.getIn(["home", "restaurants"]),
    }
  };
};

const mapDispatchToProps = dispatch => {
  const homeActions = bindActionCreators(detailsCreators, dispatch);
  return {
    homeActions
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeContainer)
);
