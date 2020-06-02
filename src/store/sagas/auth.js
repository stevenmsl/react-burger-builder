import { delay, put, call } from "redux-saga/effects";
// import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/index";
import axios from "axios";
const FIREBASE_API_KEY = "AIzaSyAeFoLL2Q8w8mGdSwm4yvSpPhf_rImHcaA";
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
const SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

// side effects happen in a saga
export function* logoutSaga(action) {
  //different approaches: instructs the middleware to call the function
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationTime");
  yield call([localStorage, "removeItem"], "userId");
  // yield localStorage.removeItem("token");
  // yield localStorage.removeItem("expirationTime");
  // yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(+action.expirationTime * 1000);
  yield put(actions.logout());
}

// you are implementing a synchronous generator
export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  const url = action.isSignup ? SIGNUP_URL : SIGNIN_URL;
  try {
    // - you hand over the caller a Promise and pause the execution.
    // - the caller should resolve the Promise and pass back the result.
    // - the execution will then resume.
    const response = yield axios.post(url, authData);
    const expirationTime = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationTime", expirationTime);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");

  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationTime = new Date(localStorage.getItem("expirationTime"));
    if (expirationTime > new Date()) {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      const ms = (expirationTime.getTime() - new Date().getTime()) / 1000;
      yield put(actions.checkAuthTimeout(ms));
    } else {
      //console.log("token expired");
      yield put(actions.logout());
    }
  }
}
