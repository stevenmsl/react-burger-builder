import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  /*
    We need to transform a object to an array of React elements 
    so we can render the ingredients dynamically.
     
    let say ingredients look like this {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2,
    }
    - Object.keys will give you an array of 4 elements : ["salad", "bacon", "chesse", "meat"]
    - the first map will turn each element in this array from a string into a array with a length 
      equals to the number of ingredient of a given type : [Array(1), Array(1), Array(2), Array(2)]
    - You need to use the spread operator to populate the array. Array(props.ingredients[igKey] 
      will just create an array and set the length to props.ingredients[igKey]. It contains 
      no elements and hence map will yield nothing in this case. 
    - the second map will replace each element in each array with a proper React element. 
    - At this stage you will have a array of arrays - [Array(1), Array(1), Array(2), Array(2)]
    - use reduce to convert the array of arrays into one dimensional array - [Array(6)] 
      Since an initial value of empty array is provided reduce method will be called 4 times. 
      In each call, you merge two arrays into one to yield a one-dimensional array with 6 elements 
    - Whether it’s a 2-d array or 1-d array React can render the elements regardless. 
      A 1-d array is easier to perform validations

  */
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => (
        <BurgerIngredient key={igKey + i} type={igKey} />
      ));
    })
    .reduce((arr, el) => arr.concat(el), []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  // console.log(transformedIngredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
