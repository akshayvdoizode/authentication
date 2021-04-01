import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./components/members/Members";
import App from "./App";
import Demo from "./components/demo/Demo";
import Profile from "./components/profile/Profile";
import { Provider } from "react-redux";
import Projects from "./components/projects/Projects";
import store from "./components/store/store";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

    {/* <Demo /> */}
    {/* <Projects /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
