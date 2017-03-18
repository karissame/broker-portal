import React from 'react';
import { Link } from "react-router";
export default React.createClass({
  render() {
    return (
       <div className="nav">
        <h1>Vista Broker Portal</h1>
        <ul role="nav">
          <li><Link  onlyActiveOnIndex={true} to="/">Home</Link></li>
          <li><Link  to="/about">About</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </div>
    )
  }
})
