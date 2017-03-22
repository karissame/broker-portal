import React from 'react';
import { connect} from "react-redux";
import { Field, Control, Form, CombineForms } from 'react-redux-form';
import * as dbActions from "../actions/dbActions";

@connect((store)=>{
    //the return becomes props
    return {
        prospect:store.forms.prospect
    }
})
class NewProspectForm extends React.Component {

  handleSubmit() {
    // Do anything you want with the form value
    // if exists same fed or DUNS number, disallow
    //add brokerid and prospect id into linking table after save.
    var prospect = this.props.prospect;
    // console.log(prospect);
    this.props.dispatch(dbActions.postProspect(prospect));
  }

  render() {
    return (
      <Form model="prospect" onSubmit={() => this.handleSubmit()}>
        <div className="field">
        <label>Contracting Entity Name</label>
        <Control.text model=".ProspectEntityName" />
        </div>
        <div className="field">
        <label>Contact First Name</label>
        <Control.text model=".ContactFirstName" />
        </div>
        <div className="field">
        <label>Contact Last Name</label>
        <Control.text model=".ContactLastName" />
        </div>
        <div className="field">
        <label>Contact Title</label>
        <Control.text model=".ContactTitle" />
        </div>
        <div className="field">
        <label>Contact Phone</label>
        <Control.text model=".ContactPhone" />
        </div>
        <div className="field">
        <label>Contact Fax</label>
        <Control.text model=".ContactFax" />
        </div>
        <div className="field">
        <label>Contact Address Line1</label>
        <Control.text model=".ContactAddressLine1" />
        </div>
        <div className="field">
        <label>Contact Address Line2</label>
        <Control.text model=".ContactAddressLine2" />
        </div>
        <div className="field">
        <label>Contact Address City</label>
        <Control.text model=".ContactAddressCity" />
        </div>
        <div className="field">
        <label>Contact Address State</label>
        <Control.text model=".ContactAddressState" />
        </div>
        <div className="field">
        <label>ContactAddressZip</label>
        <Control.text model=".ContactAddressZip" />
        </div>
        <div className="field">
        <label>Billing First Name</label>
        <Control.text model=".BillingFirstName" />
        </div>
        <div className="field">
        <label>Billing Last Name</label>
        <Control.text model=".BillingLastName" />
        </div>
        <div className="field">
        <label>Billing Address Line1</label>
        <Control.text model=".BillingAddressLine1" />
        </div>
        <div className="field">
        <label>Billing Address Line2</label>
        <Control.text model=".BillingAddressLine2" />
        </div>
        <div className="field">
        <label>Billing Address City</label>
        <Control.text model=".BillingAddressCity" />
        </div>
        <div className="field">
        <label>Billing Address State</label>
        <Control.text model=".BillingAddressState" />
        </div>
        <div className="field">
        <label>BillingAddressZip</label>
        <Control.text model=".BillingAddressZip" />
        </div>
        <div className="field">
        <label>Federal Tax D</label>
        <Control.text model=".FederalTaxID" />
        </div>
        <div className="field">
        <label>DUNS Number</label>
        <Control.text model=".DUNS_Number" />
        </div>
        <button type="submit">Add Prospect</button>
        </Form>
    );
  }
}

// No need to connect()!
export default NewProspectForm;
