import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "./components/Layout/Auth";
import { ChakraProvider } from "@chakra-ui/react";

import { auth } from "./Rotas";
import Projects from "./views/Projects";

ReactDOM.render(
  <ChakraProvider  resetCss={false} position="relative">
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={Projects} />
        {auth ?
          <Redirect from={`/`} to="/admin/projects" />
          :
          <Redirect from={`/`} to="/auth" />
        }
      </Switch>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
