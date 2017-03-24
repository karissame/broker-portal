//state is the current state
//action must have a type, and any value for payload
export default function(state={quote:[]},action){
    var newState = Object.assign(state);
    //action.type is required!
    if (typeof state.progress === 'undefined') {
        newState = {...state, progress:0};
    }
    switch(action.type) {
        case "INCREMENT_STEP": {
            var currentStep = state.progress;
            var newStep = currentStep + action.payload;
            newState = { ...state, progress:newStep};
            break;
        }
        case "QUOTE_LOADED": {
            var quote = action.payload;
            console.log("Quote reducer about to post to quote.quote");
            newState = { ...state, quote:quote};
            break;
        }
    }
    return newState; //returns the new value of the state
}
