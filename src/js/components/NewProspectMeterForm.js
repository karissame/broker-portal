import React from 'react';
import { connect} from "react-redux";
import { Control, Form } from 'react-redux-form';

class NewProspectMeterForm extends React.Component {
  handleSubmit(e) {
    // Do anything you want with the form value
    //If meter account exists, disallow.
    console.log("submitted prospect meter");
    console.log(this.props.ProspectMeters);
    this.props.dispatch(stepper.setProspect(val));
  }
  nextHandler(e) {
    //If meter account exists, disallow.
    console.log("done submitting prospect meters");
    console.log(this.props.ProspectMeters);
    this.props.dispatch(stepper.setProspect(val));
  }

  render() {
    return (
      <Form model="ProspectMeters" onSubmit={() => this.handleSubmit()}>
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
        <Control.text model=".ContactAddressZip" />
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
