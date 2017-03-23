import axios from "axios";
import { actions } from 'react-redux-form';
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
                  {type: "INSERT_FAILED", payload: response.data}
              )
          }
      })
      .catch((err) => {
          dispatch({type: "INSERT_FAILED", payload: err})
      })
  }
}
export function postProspectMeter(meter){
    console.log("in reducer. posting meter");
    return function(dispatch) {
        console.log("in dbactions. Meter passed in:");
        console.log(meter.MeterAccountNumber);
    axios.post("/submitMeter",meter)
      .then((response) => {
          console.log("Received response from server: ",response.data);
          if (response.data.success) {
              dispatch({type: "METER_LOADED", payload: response.data.ProspectMeterID});
              dispatch(actions.setSubmitted('prospectMeters', true));

          } else {
              dispatch(
                  {type: "INSERT_FAILED", payload: response.data}
              );
              dispatch(actions.setSubmitted('prospectMeters', true));
              dispatch(actions.setSubmitFailed('prospectMeters', true));
          }
      })
      .catch((err) => {
          dispatch({type: "PROSPECT_INSERT_FAILED", payload: err})
      })
  }
}
export function resetProspectMeter() {
    return function(dispatch) {
        console.log("in the dbActions now. About to dispatch a form reset");
        actions.setInitial('prospectMeters');
    }
}
