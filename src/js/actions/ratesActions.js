import axios from "axios";
//returns from function will be info that is dispatched


export function readAll(){
    console.log("in reducer. getting rates");
    return function(dispatch) {
    axios.get("/currentRates")
      .then((response) => {
          console.log("received rates from server. logging first one");
          console.log(response.data[0]);
          dispatch({type: "RATES_SET", payload: response.data})
      })
      .catch((err) => {
          dispatch({type: "RATES_SET_FAILED", payload: err})
      })
  }
}
