import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
  // return anonymous class
  return class extends Component {
    constructor(props) {
      super(props);
      // - Why setup request interceptor? to clean up the previous error if needed
      // - Setup the interceptors in the constructor so
      //   that they can take effect before child components finished rendering
      // - Need to clean up interceptors before this component is unmounted.
      //   This is because HOC component can be used to wrap many different
      //   components and as a result multiple interceptors will remain
      //   in the memory if they have never been cleaned up and might
      //   cause other errors that are difficult to debug.
      // - What is returned and stored in the properties (reqInterceptor and resInterceptor)
      //   is an ID like 0
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error });
          // console.log("response interceptor", error);
          // need to throw error or “then” of the get method
          // will still be called even when there is an error
          // for example:
          //   .get("/ingredients.json2")
          //   .then((response) => {
          //     console.log("burgerbuilder get response");
          //     this.setState({ ingredients: response.data });
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });

          throw error;
        }
      );
    }
    state = {
      error: null,
    };
    componentDidMount() {
      // console.log("withErrorHandler - componentDidMount");
      // too late to setup interceptors – move it to the constructor
      // to clean up the error if needed
      //   axios.interceptors.request.use((req) => {
      //     this.setState({ error: null });
      //     return req;
      //   });
      //   axios.interceptors.response.use(
      //     (res) => res,
      //     (error) => {
      //       this.setState({ error });
      //       console.log(error);
      //       //Promise.reject(error);
      //     }
      //   );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    componentWillUnmount = () => {
      // cleanup interceptors to prevent memory leak
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
