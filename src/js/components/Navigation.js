import React from 'react';
import { Link } from "react-router";
export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router Nav</h1>
        <ul role="nav">
          <li><Link activeStyle={{ color: 'red' }} onlyActiveOnIndex={true} to="/">Home</Link></li>
          <li><Link activeStyle={{ color: 'red' }} to="/about">About</Link></li>
          <li><Link activeStyle={{ color: 'red' }}  to="/profile">Profile</Link></li>
        </ul>
      </div>
    )
  }
})
