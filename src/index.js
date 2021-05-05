import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import HomePage from "../src/components/HomePage";
import VehicleInformation from "../src/components/VehicleInformationPage";
import { AppProvider } from "../src/AppContext";

const history = createBrowserHistory();

ReactDOM.render(
  <>
    <AppProvider>
      <main>
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/vehicle-detail-page/:id"
              component={VehicleInformation}
            />
          </Switch>
        </BrowserRouter>
      </main>
    </AppProvider>
  </>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
