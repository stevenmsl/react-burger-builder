import React from "react";
// let web pack take care of where to locate the image file
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const logo = (props) => (
  <div className={classes.Logo}>
    <img
      // don’t hard-code the path or the image file
      // can’ be found once the app is deployed
      src={burgerLogo}
      alt="MyBurger"
    />
  </div>
);

export default logo;
