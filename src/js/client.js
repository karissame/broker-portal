import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import store from "./store";
import { Router, Route, browserHistory,IndexRoute } from 'react-router';
import About from "./pages/About";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import NotFound from './pages/NotFound';

const app = document.getElementById('app');
// const routes = require('./routes');

ReactDOM.render((
    <Provider store={store}>
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
    </Provider>
), app);
