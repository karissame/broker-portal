import React from 'react';
import { connect} from "react-redux";
import { Field, Control, Form, CombineForms } from 'react-redux-form';
class NewProspectForm extends React.Component {

  handleSubmit(val) {
    // Do anything you want with the form value
    // if exists same fed or DUNS number, disallow
    //add brokerid and prospect id into linking table after save.
    console.log(val);
  }

  render() {
    return (
      <Form model="prospect" onSubmit={(val) => this.handleSubmit(val)}>
        <label>Contracting Entity Name</label>
        <Control.text model=".ProspectEntityName" />
        <label>Contact First Name</label>
        <Control.text model=".ContactFirstName" />
        <label>Contact Last Name</label>
        <Control.text model=".ContactLastName" />
        <label>Contact Title</label>
        <Control.text model=".ContactTitle" />
        <label>Contact Phone</label>
        <Control.text model=".ContactPhone" />
        <label>Contact Fax</label>
        <Control.text model=".ContactFax" />
        <label>Contact Address Line1</label>
        <Control.text model=".ContactAddressLine1" />
        <label>Contact Address Line2</label>
        <Control.text model=".ContactAddressLine2" />
        <label>Contact Address City</label>
        <Control.text model=".ContactAddressCity" />
        <label>Contact Address State</label>
        <Control.text model=".ContactAddressState" />
        <label>ContactAddressZip</label>
        <Control.text model=".ContactAddressZip" />
        <label>Billing First Name</label>
        <Control.text model=".BillingFirstName" />
        <label>Billing Last Name</label>
        <Control.text model=".BillingLastName" />
        <label>Billing Address Line1</label>
        <Control.text model=".BillingAddressLine1" />
        <label>Billing Address Line2</label>
        <Control.text model=".BillingAddressLine2" />
        <label>Billing Address City</label>
        <Control.text model=".BillingAddressCity" />
        <label>Billing Address State</label>
        <Control.text model=".BillingAddressState" />
        <label>BillingAddressZip</label>
        <Control.text model=".BillingAddressZip" />
        <label>Federal Tax D</label>
        <Control.text model=".FederalTaxID" />
        <label>DUNS Number</label>
        <Control.text model=".DUNS_Number" />

        <button>Add Prospect</button>
      </Form>
    );
  }
}

// No need to connect()!
export default NewProspectForm;
