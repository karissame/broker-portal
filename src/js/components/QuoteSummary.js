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
    if (typeof this.props.quote.meterDetails === "undefined") {
    this.props.dispatch(stepper.getQuote(this.props.prospects.selected));
}}

  // handleChange(val) {
  //     console.log(val);
  //     this.props.dispatch(stepper.setProspect(val));
  //
  // }
  render() {
      if (typeof this.props.quote.meterDetails === "undefined") {
    return (
      <div id="quote">
        <p>Combined Annual Usage: {this.props.quote.totalUsage}</p>
        <br />
      </div>
    );
} else {
    return (
        <div id="quote">
          <p>Combined Annual Usage: {this.props.quote.totalUsage}</p>
          <br />
          <p>Number of Meters: {this.props.quote.meterDetails.length}</p>
          <br />
        </div>
    )
}}
}
