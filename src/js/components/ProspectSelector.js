import React from "react";
import { connect } from "react-redux";
import * as stepper from "../actions/stepperActions";

@connect((store)=>{
    //the return becomes props
    return {
        prospects:store.prospects.prospects
    }
})
export default class ProspectSelector extends React.Component {
  handleChange(val) {
      console.log(val);
      this.props.dispatch(stepper.setProspect(val));

  }
  render() {
    return (
      <div id="selector">
          <span>Select a Prospect or Start New: </span>
          <select onChange={(e) => this.handleChange(e.target.value)}>
            <option key='0' value='0'>Select One</option>
            {this.props.prospects.map(item => (
              <option key={item.ProspectID} value={item.ProspectID}>{item.ProspectEntityName}</option>))
            }
          </select>
      </div>
    );
  }
}
