import React from 'react';
import { connect } from "react-redux";
import { Grid, Column, Cell, Pager, Paging } from 'eddyson-react-grid';
import * as rates from "../actions/ratesActions";

@connect((store)=>{
    //the return becomes props
    return {
        rates:store.rates.rates,
        notification:store.rates.notification
    }
})

class RatesFilteredDisplay extends React.Component {
    loadRates(){
        console.log("Fetch Rates button clicked");
        this.props.dispatch(rates.readAll());
    }

    render() {
        var map = this.props.rates.reduce(function(map, rate) {
          var k = [rate.Utility, rate.Profile, rate.AnnualUsageLowerBound, rate.AnnualUsageUpperBound, rate.StartDate].join()
          if (!map[k]) map[k] = {
            Utility: rate.Utility,
            Profile: rate.Profile,
            AnnualUsageLowerBound: rate.AnnualUsageLowerBound,
            AnnualUsageUpperBound: rate.AnnualUsageUpperBound,
            StartDate: rate.StartDate
          }
          map[k][rate.ContractLength] = rate.ContractRate
          return map
        }, {})

        var result = Object.keys(map).map(function(k) { return this[k] }, map);
       //Console log of rates received (or mapped results) doesn't work. The console log logs undefined and doesn't run again after the props.rates are received but before the re-render of the rate grid stops the log from hitting.
       if (this.props.rates[0]) {
       return(
           <div id="rateTable">
           <Grid objects={result}>
                 <Pager rowsPerPage={20} />
                 <Column name="Utility" label="Utility" />
                 <Column name="PremiseType" label="Premise" hide={true}/>
                 <Column name="Profile" label="Profile" />
                 <Column name="AnnualUsageLowerBound" label="Annual Usage Min" />
                 <Column name="AnnualUsageUpperBound" label="Annual Usage Max" />
                 <Column name="StartDate" label="Flow Start Date" />
                 <Column name="3" label="3 Month Rate" />
                 <Column name="6" label="6 Month Rate" />
                 <Column name="12" label="12 Month Rate" />
                 <Column name="24" label="24 Month Rate" />
                 <Column name="LineID" hide={true} />
                 <Column name="id" hide={true} />
               </Grid></div>
       );} else {
           return(<div>
               <div id="notification">{this.props.notification}</div><button id="ratesButton"onClick={this.loadRates.bind(this)}>Load Rates</button></div>);
       }
    };
}

module.exports = RatesFilteredDisplay;
