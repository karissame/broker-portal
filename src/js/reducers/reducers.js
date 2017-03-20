import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import todoReducer from "./TodoReducer";
import rateReducer from "./RateReducer";
import stepperReducer from "./StepperReducer";
import quoteReducer from "./QuoteReducer";
// import combineForms from 'react-redux-form';
const initialProspect = {};
export default combineReducers({
    user:userReducer,todos:todoReducer,rates:rateReducer,prospects:stepperReducer,quote:quoteReducer
});
