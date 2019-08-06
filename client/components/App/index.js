import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";

import initialState from "../GlobalState/initialState";
import reducer from "../GlobalState/reducer";
import { StateProvider } from "../GlobalState/StateProvider";
import { Home } from "../../components";

const App = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </StateProvider>
  );
};

export default withRouter(App);
