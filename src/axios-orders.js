import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-ac057.firebaseio.com/",
});

export default instance;
