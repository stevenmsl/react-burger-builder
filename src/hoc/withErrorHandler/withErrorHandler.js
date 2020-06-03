import React, { useState, useEffect } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    // You can just setup the interceptors here –
    // used to be done in the constructor in a class component
    const reqInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });
    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        setError(error);
        throw error;
      }
    );

    // replacing componentWillUnmount with useEffect
    useEffect(
      () => {
        // cleanup interceptors to prevent memory leak
        return () => {
          axios.interceptors.request.eject(reqInterceptor);
          axios.interceptors.response.eject(resInterceptor);
        };
      },
      [reqInterceptor, resInterceptor] /*  */
    );

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
