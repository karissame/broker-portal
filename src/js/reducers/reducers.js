import { combineReducers } from "redux";
import rateReducer from "./RateReducer";
import stepperReducer from "./StepperReducer";
import quoteReducer from "./QuoteReducer";
import { combineForms } from 'react-redux-form';
const initialProspectState = {};
export default combineReducers({
    rates:rateReducer,prospects:stepperReducer,quote:quoteReducer,forms:combineForms({prospect:initialProspectState,prospectMeters:initialProspectState})
});
