import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import rLanding from "./pages/landing";
import rKitnetMap from "./pages/kitnetMap";
import rKitnet from "./pages/kitnet";
import rCreateKitnet from "./pages/createKitnet";

function Routes() {
  return (
    <BrowserRouter>
     <Switch>
      <Route path="/" exact component={rLanding} />
      <Route path="/app" component={rKitnetMap} />
      <Route path="/kitnet/create" component={rCreateKitnet} />
      <Route path="/kitnet/:id" component={rKitnet} />
    </Switch>   
    </BrowserRouter>
  );
}

export default Routes;
