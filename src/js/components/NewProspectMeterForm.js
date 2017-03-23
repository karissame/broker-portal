import React from 'react';
import { connect} from "react-redux";
import { Field, Control, Form, CombineForms, modelReducer, actions } from 'react-redux-form';
import * as dbActions from "../actions/dbActions";


@connect((store)=>{
    //the return becomes props
    return {
        ProspectMeters:store.forms.prospectMeters,
        FormStatus:store.forms.forms.prospectMeters.$form
    }
})
class NewProspectMeterForm extends React.Component {
  ComponentDidMount() {
      console.log("meter form is mounted.");
      this.props.dispatch(actions.setPending('prospectMeters', true));
  }
  handleSubmit() {
    // Do anything you want with the form value
    //If meter account exists, disallow.
    console.log("in NewProspectMeterForm. logging AnnualUsage");
    var meter =this.props.ProspectMeters;
    console.log(meter.AnnualUsage);
    console.log("submitted prospect meter");
    // console.log(meter);
    this.props.dispatch(dbActions.postProspectMeter(meter));
    console.log("posted meter. About to send reset form action");
    do {
        console.log("In formstatus loop. logging form status then .pending");
        console.log(this.props.FormStatus);
        if (this.props.FormStatus.submitted && this.props.FormStatus.submitFailed =="false") {
            this.props.dispatch(dbActions.resetProspectMeter());
        } else if (this.props.FormStatus.submitFailed) {
            break;
        }
    } while (this.props.FormStatus.pending);

  }
  nextHandler(e) {
    //If meter account exists, disallow.
    console.log("done submitting prospect meters");
    if (this.props.ProspectMeters.Utility) {
        console.log("the form is not empty");
        var meter =this.props.ProspectMeters;
        console.log(meter);
        this.props.dispatch(dbActions.postProspectMeter(meter));
    }
    this.props.dispatch(dbActions.nextStep());
  }

  render() {
    return (
      <Form model="prospectMeters" onSubmit={() => this.handleSubmit()}>
        <div className="field">
        <label>Meter Account Number</label>
        <Control.text model=".MeterAccountNumber" />
        </div>
        <div className="field">
        <label>Meter Address Line1</label>
        <Control.text model=".MeterAddressLine1" />
        </div>
        <div className="field">
        <label>Meter Address Line2</label>
        <Control.text model=".MeterAddressLine2" />
        </div>
        <div className="field">
        <label>Meter Address City</label>
        <Control.text model=".MeterAddressCity" />
        </div>
        <div className="field">
        <label>Meter Address State</label>
        <Control.text model=".MeterAddressState" />
        </div>
        <div className="field">
        <label>MeterAddressZip</label>
        <Control.text model=".MeterAddressZip" />
        </div>
        <div className="field">
        <label>Premise Type</label>
        <Control.text model=".PremiseType" />
        </div>
        <div className="field">
        <label>Profile</label>
        <Control.text model=".Profile" />
        </div>
        <div className="field">
        <label>Annual Usage</label>
        <Control.text model=".AnnualUsage" />
        </div>
        <div className="field">
        <label>Utility</label>
        <Control.text model=".Utility" />
        </div>
        <button type="submit">Add Meter</button>
        <button type="next" onClick={() => this.nextHandler()}>Finish Quote</button>
      </Form>
    );
  }
}

// No need to connect()!
export default NewProspectMeterForm;
