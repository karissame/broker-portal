import React from "react";
import { Router, Route, browserHistory,IndexRoute } from 'react-router';
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const routes = (
        <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <Route path="*" component={NotFound}/>
        </Route>
        </Router>
);

export default routes;
