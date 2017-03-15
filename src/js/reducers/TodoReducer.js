//state is the current state
//action must have a type, and any value for payload
export default function(state={todos:[]},action){
    var newState = Object.assign(state);
    //action.type is required!
    if(action.type=="ADD_TODO"){

    }
    switch(action.type) {
        case "ADD_TODO": {
            console.log(action);
            var todos = state.todos.concat(action.payload.text);
            newState = { ...state, todos:todos };
            break;
        }
        case "TODO_READ": {
            // var todos = state.todos.concat(action.payload.text);
            var todos = action.payload;
            newState = { ...state, todos:todos };
            break;
        }
        case "CHANNEL_CHANGE": {
            // var todos = state.todos.concat(action.payload.text);
            newState = { ...state, activeChannel:action.payload.activeChannel };
            break;
        }
    }
    return newState; //returns the new value of the state
}
