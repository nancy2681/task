import React from "react";
import { Provider } from "react-redux";
import Screen from "./screen";
import store from "./store";
export default function App(props) {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  );
}
