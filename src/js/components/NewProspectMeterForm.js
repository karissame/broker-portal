import React from 'react';
import { connect} from "react-redux";
import { Control, Form } from 'react-redux-form';

class NewProspectMeterForm extends React.Component {
  handleSubmit(val) {
    // Do anything you want with the form value
    //If meter account exists, disallow.
    console.log(val);
  }

  render() {
    return (
      <Form model="ProspectMeters" onSubmit={(val) => this.handleSubmit(val)}>
        <label>Meter Account Number</label>
        <Control.text model=".MeterAccountNumber" />
        <label>Meter Address Line1</label>
        <Control.text model=".MeterAddressLine1" />
        <label>Meter Address Line2</label>
        <Control.text model=".MeterAddressLine2" />
        <label>Meter Address City</label>
        <Control.text model=".MeterAddressCity" />
        <label>Meter Address State</label>
        <Control.text model=".MeterAddressState" />
        <label>MeterAddressZip</label>
        <Control.text model=".ContactAddressZip" />
        <label>Premise Type</label>
        <Control.text model=".PremiseType" />
        <label>Profile</label>
        <Control.text model=".Profile" />
        <label>Annual Usage</label>
        <Control.text model=".AnnualUsage" />
        <label>Utility</label>
        <Control.text model=".Utility" />

        <button>Add Meter</button>
      </Form>
    );
  }
}

// No need to connect()!
export default NewProspectMeterForm;
