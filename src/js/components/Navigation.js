import React from 'react';
import { Link } from "react-router";
export default React.createClass({
  render() {
    return (
       <div className="nav">
        <h1>Vista Broker Portal</h1>
        <ul role="nav">
          <li><Link  onlyActiveOnIndex={true} to="/">Home</Link></li>
          <li><Link  to="/Invoices">Invoices</Link></li>
        </ul>
      </div>
    )
  }
})
