//state is the current state
//action must have a type, and any value for payload
export default function(state={prospects:[]},action){
    var newState = Object.assign(state);
    //action.type is required!

    switch(action.type) {
        case "PROSPECTS_LOADED": {
            var prospects = action.payload;
            newState = { ...state, prospects:prospects };
            break;
        }
        case "PROSPECTS_FAILED": {
            // console.log("Prospects could not be fetched");
            // console.log(action);
            // newState = { ...state};
            break;
        }
        case "PROSPECT_LOADED": {
            var selected = action.payload;
            console.log('in stepper reducer. selected prospect:');
            console.log(selected);
            newState = { ...state, selected:selected };
            break;
        }
    }
    return newState; //returns the new value of the state
}
