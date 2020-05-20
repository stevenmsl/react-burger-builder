import React, { Component } from "react";

/*
  ImportComponent is a function that 
  returns a module; here is an example:  
  () => {
    return import("./containers/Checkout/Checkout");
  }
*/

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      importComponent().then((cmp) => {
        console.log(cmp); // this is a module
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
