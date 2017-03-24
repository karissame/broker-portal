import axios from "axios";
//returns from function will be info that is dispatched


export function getIDs(){
    console.log("in reducer. getting prospect IDs");
    return function(dispatch) {
    axios.get("/prospects")
      .then((response) => {
          console.log("received prospect IDs from server. logging first one");
          console.log(response.data[0]);
          dispatch({type: "PROSPECTS_LOADED", payload: response.data})
      })
      .catch((err) => {
          dispatch({type: "PROSPECTS_FAILED", payload: err})
      })
  }
}
export function getQuote(prospect){
    console.log("in reducer. getting quote items for prospect:");
    console.log(prospect);
    console.log('***************************');
    return function(dispatch) {
    //in future, make the params in server from session instead of explicit passing.
    axios.get("/quote", {
        params: {
            prospect:prospect
        }
    })
      .then((response) => {
          console.log("received quote data server. logging");
          console.log(response.data.quote);
          dispatch({type: "QUOTE_LOADED", payload: response.data.quote})
      })
      .catch((err) => {
          dispatch({type: "QUOTE_FAILED", payload: err})
      })
  }
}

export function setProspect(id){
    console.log("in reducer. setting prospect");
    return function(dispatch) {
      dispatch({type: "PROSPECT_LOADED", payload: id}),
      dispatch({type: "INCREMENT_STEP", payload: 1})
    }
}

export function nextStep(){
    console.log("in reducer. incrementing the stepper");
    return function(dispatch) {
        dispatch({type: "INCREMENT_STEP", payload: 1})
    };
}
