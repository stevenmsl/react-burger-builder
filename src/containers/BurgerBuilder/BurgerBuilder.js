import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    //ingredients: null, // moved to Redux
    //totalPrice: 4, // moved to Redux
    //purchasable: false, // no longer needed; derived from the Redux state
    // track if the ORDER NOW button has been clicked to place an order
    purchasing: false,
    loading: false,
    error: false,
  };

  // this will be called before withErrorHandler’s (parent) componentDidMount
  componentDidMount = () => {
    //console.log("BurgerBuilder - componentDidMount");
    // axios
    //   .get("/ingredients.json")
    //   .then((response) => {
    //     console.log("burgerbuilder get response");
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //     this.setState({ error: true });
    //   });
  };

  updatePurchaseState(ingredients) {
    // - Use map to convert the object into an array of numbers
    //   with each element contains the quantity
    //   of a particular ingredient
    // - Use reduce to sum up all quantities
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  }

  // // addIngredientHandler and removeIngredientHandler
  // // has been replaced by the reducer
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };

  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };

  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  // use Redux
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  // //use searching parameter to pass along ingredients
  // purchaseContinueHandler = () => {
  //   const queryParams = [];
  //   for (let i in this.state.ingredients) {
  //     let ingredient = encodeURIComponent(i);
  //     let quantity = encodeURIComponent(this.state.ingredients[i]);
  //     queryParams.push(`${ingredient}=${quantity}`);
  //   }
  //   queryParams.push(`price=${this.state.totalPrice}`);
  //   const queryString = queryParams.join("&");
  //   this.props.history.push({
  //     pathname: "/checkout",
  //     // This is what you try to compose
  //     // ?bacon=0&cheese=0&meat=0&salad=4
  //     search: `?${queryString}`,
  //   });
  //   // alert("You continue!");
  // };

  render() {
    const disabledInfo = {
      ...this.props.ings, // from Redux store through property
    };

    // it should look like {salad: true, …} after the transformation
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    // The ingredients data is now coming from the server;
    // wait until the data is ready before rendering
    // components depending on it
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
      }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
