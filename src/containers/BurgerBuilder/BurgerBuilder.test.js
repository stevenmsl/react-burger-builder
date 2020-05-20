import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder/>", () => {
  let wrapper;

  // will be executed before each test
  beforeEach(() => {
    // Need to set the onInitIngredient property here.
    // It will be too late to do it in wrapper.setProps
    wrapper = shallow(<BurgerBuilder onInitIngredient={() => {}} />);
  });

  it("should render <BuildControls/> when receiving ingredients", () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
