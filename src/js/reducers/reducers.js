import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import todoReducer from "./TodoReducer";
import rateReducer from "./RateReducer";
export default combineReducers({
    user:userReducer,todos:todoReducer,rates:rateReducer
});
