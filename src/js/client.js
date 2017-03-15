import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "./components/TodoApp";
import { Provider } from "react-redux";
import store from "./store";
import { Router, Route, hashHistory,IndexRoute } from 'react-router';
import About from "./pages/About";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

const app = document.getElementById('app');

ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
        <Route path="/" component={TodoApp}>
            {/* add it here, as a child of `/` */}
            <IndexRoute component={Home}/>
            {/* make them children of `App` */}
            <Route path="/profile/:param1/:param2" component={Profile}/>
            <Route path="/about" component={About}/>
        </Route>
        </Router>
    </Provider>
), app);
