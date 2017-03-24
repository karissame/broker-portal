import React from 'react';
import { connect} from "react-redux";
import { Field, Control, Form, CombineForms, modelReducer, actions } from 'react-redux-form';
import * as dbActions from "../actions/dbActions";
import * as stepperActions from "../actions/stepperActions";


@connect((store)=>{
    //the return becomes props
    return {
        ProspectMeters:store.forms.prospectMeters,
        FormStatus:store.forms.forms.prospectMeters.$form
    }
})
class NewProspectMeterForm extends React.Component {
  handleSubmit() {
    // Do anything you want with the form value
    //If meter account exists, disallow.
    var meter =this.props.ProspectMeters;
    console.log("submitting prospect meter to dbActions");
    this.props.dispatch(dbActions.postProspectMeter(meter));
    // console.log("NPMF finished posted meter.");

  }
  nextHandler(e) {
    //If meter account exists, disallow.
    console.log("done button clicked");
    if (this.props.ProspectMeters.Utility) {
        console.log("the form is not empty");
        var meter =this.props.ProspectMeters;
        // console.log(meter);
        this.props.dispatch(dbActions.postProspectMeter(meter));
    }
    this.props.dispatch(stepperActions.nextStep());
    e.preventDefault();
  }

  render() {
    // if (this.props.FormStatus.pending || this.props.FormStatus.submitFailed) {
    return (
      <Form model="prospectMeters" onSubmit={() => this.handleSubmit()}>
        <div className="field">
        <label>Meter Account Number</label>
        <Control.text model=".MeterAccountNumber" value={this.props.ProspectMeters.MeterAccountNumber} />
        </div>
        <div className="field">
        <label>Meter Address Line1</label>
        <Control.text model=".MeterAddressLine1" value={this.props.ProspectMeters.MeterAddressLine1} />
        </div>
        <div className="field">
        <label>Meter Address Line2</label>
        <Control.text model=".MeterAddressLine2" value={this.props.ProspectMeters.MeterAddressLine2} />
        </div>
        <div className="field">
        <label>Meter Address City</label>
        <Control.text model=".MeterAddressCity" value={this.props.ProspectMeters.MeterAddressCity} />
        </div>
        <div className="field">
        <label>Meter Address State</label>
        <Control.text model=".MeterAddressState" value={this.props.ProspectMeters.MeterAddressState} />
        </div>
        <div className="field">
        <label>MeterAddressZip</label>
        <Control.text model=".MeterAddressZip" value={this.props.ProspectMeters.MeterAddressZip} />
        </div>
        <div className="field">
        <label>Premise Type</label>
        <Control.text model=".PremiseType" value={this.props.ProspectMeters.PremiseType} />
        </div>
        <div className="field">
        <label>Profile</label>
        <Control.text model=".Profile" value={this.props.ProspectMeters.Profile} />
        </div>
        <div className="field">
        <label>Annual Usage</label>
        <Control.text model=".AnnualUsage" value={this.props.ProspectMeters.AnnualUsage} />
        </div>
        <div className="field">
        <label>Utility</label>
        <Control.text model=".Utility" value={this.props.ProspectMeters.Utility} />
        </div>
        <button type="submit">Add Meter</button>
        <button type="next" onClick={(e) => this.nextHandler(e)}>Finish Quote</button>
      </Form>
  );
// }
  }
}

// No need to connect()!
export default NewProspectMeterForm;
