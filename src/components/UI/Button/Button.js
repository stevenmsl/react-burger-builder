import React from "react";
import classes from "./Button.module.css";
const button = (props) => (
  <button
    // - use an array so multiple classes can be applied
    // - btnType can be either Success or Danger
    // - concatenate elements in the array into a string
    //   as className only accept string
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default button;
