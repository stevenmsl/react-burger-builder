import React from "react";

import classes from "./NavigationItem.module.css";

const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <a
        href={props.link}
        // don’t need to specify anything if it’s currently not active
        // – it would pick up “NavigationItem a” by default
        className={props.active ? classes.active : null}
      >
        {props.children}
      </a>
    </li>
  );
};
export default navigationItem;
