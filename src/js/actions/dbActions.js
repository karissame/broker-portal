import axios from "axios";
//returns from function will be info that is dispatched


export function postProspect(prospect){
    console.log("in reducer. posting prospect");
    return function(dispatch) {
        console.log("in dbactions. Prospect passed in:");
        console.log(prospect.ContactFirstName);
    axios.post("/submitProspect",prospect)
      .then((response) => {
          console.log("Received response from server: ",response.data);
          if (response.data.success) {
              dispatch({type: "PROSPECT_LOADED", payload: response.data.prospectID});
              dispatch({type: "INCREMENT_STEP", payload: 1});
          } else {
              dispatch(
                  {type: "PROSPECT_INSERT_FAILED", payload: response.data}
              )
          }
      })
      .catch((err) => {
          dispatch({type: "PROSPECT_INSERT_FAILED", payload: err})
      })
  }
}
