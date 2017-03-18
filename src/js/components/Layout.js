import React from "react";
import TodoList from "./TodoList";
import { connect } from "react-redux";
import * as user from "../actions/userActions";
import * as todo from "../actions/todoActions";
import * as rates from "../actions/ratesActions";
import Navigation from "./Navigation";
import RatesFilteredDisplay from "./RatesFilteredDisplay2";

@connect((store)=>{
    //the return becomes props
    return {
        user:store.user.user,
        todos:store.todos.todos
    }
})
export default class Layout extends React.Component {
  componentWillMount(){
    //   console.log("Mounting:",this.props.user);
      //this.props.dispatch(user.readUser());
  }

  handleSubmit(e){
      e.preventDefault();
  }

  readUser(){
      this.props.dispatch(user.readUser());
    //   this.props.dispatch(todo.readAll(channel));
  }

  loadTodos(){
      this.props.dispatch(todo.readAll());
  }
  loadRates(){
      console.log("Fetch Rates button clicked");
      this.props.dispatch(rates.readAll());
  }

  render() {
    //   console.log(this.props);
      const todos = this.props.todos.map(todo => <li>{todo.text}</li>);
    return (
      <div>
        <Navigation />
        <button onClick={this.loadTodos.bind(this)}>Load Todos</button>
        <button onClick={this.loadRates.bind(this)}>Load Rates</button>
        <div id="main">
            <RatesFilteredDisplay />
            <TodoList />
        </div>
      </div>
    );
  }
}
