import * as actionTypes from "./actionTypes";
// import axios from "../../axios-orders";
// sync
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

// sync
export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

// async
export const purchaseBurger = (orderData, token) => {
  return { type: actionTypes.PURCHASE_BURGER, orderData, token };
  //return (dispatch) => {
  // dispatch(purchaseBurgerStart());
  // const url = `/orders.json?auth=${token}`;
  // axios
  //   //  - You need to append “.json” to your collection (orders);
  //   //    this is specific to Firebase.
  //   //  - the collection will be created if it has not existed yet.
  //   .post(url, orderData)
  //   .then((response) => {
  //     dispatch(purchaseBurgerSuccess(response.data.name, orderData));
  //   })
  //   .catch((error) => {
  //     dispatch(purchaseBurgerFail(error));
  //   });
  //};
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return { type: actionTypes.FETCH_ORDERS, token, userId };
  // return (dispatch) => {
  //   dispatch(fetchOrdersStart());
  //   const url = `/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       // console.log(res.data);
  //       const fetchedOrders = [];
  //       // the returned data is not an array but an object.
  //       // It looks like this:
  //       // {-M66z8UGVJFocIMOLJeb: {…}, -M66zCci9YEQoMmM_SMB: {…}}
  //       for (let key in res.data) {
  //         fetchedOrders.push({
  //           ...res.data[key],
  //           id: key,
  //         });
  //       }
  //       dispatch(fetchOrdersSuccess(fetchedOrders));
  //     })
  //     .catch((err) => {
  //       dispatch(fetchOrdersFail(err));
  //     });
  // };
};
