import React from 'react';
import { connect} from "react-redux";
import * as stepper from "../actions/stepperActions";
import ProspectSelector from "./ProspectSelector";
import NewProspectForm from "./NewProspectForm";
import NewProspectMeterForm from "./NewProspectMeterForm";

@connect((store)=>{
    //the return becomes props
    return {
        quoteProgress:store.quote.progress
    }
})
export default class QuoteStepper extends React.Component {
  render() {
    switch (this.props.quoteProgress) {
        case 0:
            return (
              <div id="stepper">
                <div className="step">START A QUOTE</div>
                <ProspectSelector />
                <NewProspectForm />
              </div>
            );
        case 1:
            return (
              <div id="stepper">
                <div className="step">ADD METERS</div>
                <NewProspectMeterForm />
              </div>
            );
        default:
            return (
              <div id="stepper">
                <div className="step">START A QUOTE</div>
                <ProspectSelector />
                <NewProspectForm />
              </div>
            );
    }

  }
}
