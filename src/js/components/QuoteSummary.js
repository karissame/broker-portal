import React from "react";
import { connect } from "react-redux";
import * as stepper from "../actions/stepperActions";

@connect((store)=>{
    //the return becomes props
    return {
        quote:store.quote.quote,
        prospects:store.prospects
    }
})
export default class QuoteSummary extends React.Component {
  componentWillMount(){
    console.log("quote summary will mount");
    console.log(this.props.quote);
    if (typeof this.props.quote.totalUsage === "undefined") {
    this.props.dispatch(stepper.getQuote(this.props.prospects.selected));
}}

  // handleChange(val) {
  //     console.log(val);
  //     this.props.dispatch(stepper.setProspect(val));
  //
  // }
  render() {
    return (
      <div id="quote">
        {this.props.quote.totalUsage}
      </div>
    );
  }
}
