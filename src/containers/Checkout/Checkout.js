import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
// import * as actions from "../../store/actions/index";

class Checkout extends Component {
  constructor(props) {
    super(props);
    // console.log(
    //   "Checkout constructor sees this.props.purchased:",
    //   this.props.purchased
    // );
    // set the purchased to false, too late for
    // the render method to see the change
    // through property. Move it up to the burger
    // builder container
    // this.props.onInitPurchase();

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
    // in case users reload the checkout page
    // all ingredients will be gone;
    // redirect them back to home page.
    let summary = <Redirect to="/" />;
    // show checkout summary only if there are ingredients
    if (this.props.ings) {
      // console.log(
      //   "Checkout render see this.props.purchased:",
      //   this.props.purchased
      // );
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

// const mapDispatchToPros = (dispatch) => {
//   return {
//     onInitPurchase: () => dispatch(actions.purchaseInit()),
//   };
// };

export default connect(mapStateToProps /* mapDispatchToPros*/)(Checkout);
