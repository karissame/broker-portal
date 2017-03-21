import React from "react";
import { connect } from "react-redux";
import * as stepper from "../actions/stepperActions";
import Navigation from "./Navigation";
import RatesFilteredDisplay from "./RatesFilteredDisplay2";
import QuoteStepper from "./QuoteStepper";

@connect((store)=>{
    //the return becomes props
    return {
        rates:store.rates.rates
    }
})
export default class Layout extends React.Component {
  componentWillMount(){
      this.props.dispatch(stepper.getIDs());
  }

  handleSubmit(e){
      e.preventDefault();
  }

  // loadRates(){
  //     console.log("Fetch Rates button clicked");
  //     this.props.dispatch(rates.readAll());
  // }

  render() {
    return (
      <div>
        <Navigation />
        <div id="main">
            <RatesFilteredDisplay />
            <QuoteStepper />
        </div>
      </div>
    );
  }
}
