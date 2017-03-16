import React from "react";
import { Router, Route, browserHistory,IndexRoute } from 'react-router';
import Layout from "./components/Layout";

import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const routes = (
        <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            {/* add it here, as a child of `/` */}
            <IndexRoute component={Home}/>
            {/* make them children of `App` */}
            <Route path="/profile/:param1/:param2" component={Profile}/>
            <Route path="/about" component={About}/>
            <Route path="*" component={NotFound}/>
        </Route>
        </Router>
);

export default routes;
