//state is the current state
//action must have a type, and any value for payload
export default function(state={quote:[]},action){
    var newState = Object.assign(state);
    //action.type is required!

    switch(action.type) {
        case "INCREMENT_STEP": {
            newState = { ...state, progress:progress + action.payload};
            break;
        }
    }
    return newState; //returns the new value of the state
}
