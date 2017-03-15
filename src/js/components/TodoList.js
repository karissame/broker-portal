import React from "react";
import { connect } from "react-redux";

@connect((store)=>{
    //the return becomes props
    return {
        todos:store.todos.todos
    }
})
export default class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    );
  }
}
