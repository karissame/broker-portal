import React from "react";
import { connect } from "react-redux";

@connect((store)=>{
    //the return becomes props
    return {
        prospects:store.prospects.prospects
    }
})
export default class ProspectSelector extends React.Component {
  handleChange(val) {
      this.props.dispatch(stepper.setProspect(val));

  }
  render() {
    return (
      <div id="selector">
          <span>Select an Existing Prospect or Start a New One: </span>
          <select onChange={(val) => this.handleChange(val)}>
            {this.props.prospects.map(item => (
              <option key={item.ProspectID}>{item.ProspectEntityName}</option>))
            }
          </select>
      </div>
    );
  }
}
