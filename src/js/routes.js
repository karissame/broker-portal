import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "./components/TodoApp";
import { Router, Route, hashHistory,IndexRoute } from 'react-router';

import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const routes = (
        <Router history={hashHistory}>
        <Route path="/" component={TodoApp}>
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
