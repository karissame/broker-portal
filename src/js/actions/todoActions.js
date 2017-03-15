import axios from "axios";
//returns from function will be info that is dispatched
//import in target file with
//import * as user from "/path/to/actions/userAction.js";
//call user.readUser
// OR
//import { readUser } from "/path/to/actions/userAction.js";
//call setUserName('Janice');

export function readAll(){
    console.log("reading todos");
    return function(dispatch) {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        dispatch({type: "TODO_READ", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "TODO_READ_FAILED", payload: err})
      })
  }
}

export function create(text){
    return {
        type:"TODO_CREATE",
        payload:text
    }
}
