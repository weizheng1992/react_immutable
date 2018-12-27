import React, { Component } from "react";
import Loading from "../component/loading";
import nprogress from "nprogress";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }
    componentWillMount() {
      nprogress.start();
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
      nprogress.done();
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : <Loading visible={true} />;
    }
  }

  return AsyncComponent;
}
