import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  constructor(props) {
    super(props);
    // retrieve search parameters
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      // ['salad', '1']
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1]; // quantity needs to be a number
      }
    }
    this.state = {
      ingredients,
      totalPrice: price,
    };
  }

  componentDidMount() {
    // retrieve search parameters
    // - too late to happen here as the ContactData (child) has been mounted
    // - move it up to constructor
  }
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        {/* 
          - use render property so you can pass the ingredients to
            the Contact Data component.
          - pass down the route properties using spread operator
          */}
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...this.props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
