import React from 'react'
export default React.createClass({
  render() {
    return <div>Profile - {this.props.params.param1} - {this.props.params.param2}</div>
  }
})
