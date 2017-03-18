//state is the current state
//action must have a type, and any value for payload
export default function(state={rates:[]},action){
    var newState = Object.assign(state);
    //action.type is required!

    switch(action.type) {
        case "RATES_SET": {
            var rates = action.payload;
            newState = { ...state, rates:rates };
            break;
        }
        case "RATES_SET_FAILED": {
            console.log("Rates could not be set");
            console.log(action);
            newState = { ...state};
            break;
        }
    }
    return newState; //returns the new value of the state
}
