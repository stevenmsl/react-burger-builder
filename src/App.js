import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
//import Checkout from "./containers/Checkout/Checkout";
//import Orders from "./containers/Orders/Orders";
//import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

import * as actions from "./store/actions/index";

/* 
   lazy loading
   - use React.lazy to lazy load the components 
   - use Suspense component to wrap the routes 
   - in each route specify the component you want 
     to activate when the route become active 
     using render property instead of component property
   - Since you are now using render property in the route you also 
     have to forward the properties received to the wrapped
    component for example <Auth {…props}/>
*/
const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});

const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

// Need to start with a upper case; "app" won’t work
const App = (props) => {
  // - replace component Did Mount
  // - specify dependencies so
  //   it only runs once
  const { onTryAutoSignup } = props;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      {/* need to use render property instead of component 
          property for last loading */}
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      {/* By default, only Burger Builder has access to the route properties 
                but not its children */}
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        {/* to make it work for the case where users need to 
          be redirected from Auth to the checkout path  */}
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        {/* <Suspense> component lets you “wait” 
            for some code to load */}
        <Suspense fallback={<p>Loading</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => {
      dispatch(actions.authCheckState());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
// need to use withRouter to pass updated match, location,
// and history props to App as it is now wrapped inside
// the connect hoc
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
