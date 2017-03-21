import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import store from "./store";
import { Router, Route, browserHistory,IndexRoute } from 'react-router';
import NotFound from './pages/NotFound';

const app = document.getElementById('app');
// const routes = require('./routes');

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>
), app);
