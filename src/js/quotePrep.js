const bodyParser = require('body-parser');
const connection = require('./dbconfig');
var knex = require('knex')({
  client: 'mssql',
  connection:{
      host : connection.default.host,
      user : connection.default.user,
      password : connection.default.password,
      database : connection.default.database
  }
});

export function quotePrep(prospectID, callback){
    var prospectID = prospectID;
    var quotePieces= {
        prospectDetails:{

        },
        meterDetails:[

        ],
        totalUsage:0,
        blendedRate:0
    };
    knex.raw('SELECT pm.ProspectMeterID, pm.PremiseType as Supplied_PremiseType , pm.Profile as Supplied_Profile, pm.AnnualUsage as Supplied_AnnualUsage, pm.Utility as Supplied_Utility, vc.LineID as InitialMeterRateLineItem , vc.StartDate , vc.ContractLength , vc.ContractRate as InitialMeterRateQuote FROM BrokerPortal.ProspectMeters pm INNER JOIN BrokerPortal.v_CurrentDayRates vc ON pm.PremiseType = vc.PremiseType AND pm.Profile = vc.Profile AND pm.Utility = vc.Utility AND pm.AnnualUsage BETWEEN vc.AnnualUsageLowerBound AND vc.AnnualUsageUpperBound WHERE pm.IsDeleted = 0 AND ProspectID = :ProspectID AND vc.ContractLength = :ContractLength AND vc.StartDate = :StartDate', {
            ProspectID:prospectID,
            ContractLength:24,
            StartDate:'2017-04-01'
        })
    .asCallback(function(err,results) {
      if (err)    {
          console.log("error retrieving meters");
          return({success:false,message:err.message});
          }
      else{
          console.log("Meters fetched. They are:");
          console.log(results);
          quotePieces.meterDetails = results;
          quotePieces.meterDetails.forEach(function(item) {
              quotePieces.totalUsage += item.Supplied_AnnualUsage;
          });
          console.log(quotePieces);
          var finished_meters=quotePieces;
          }
    })
    .then(function(finished_meters) {
        console.log("about to send back to server:");
        // console.log(quotePieces);
        callback(quotePieces);
    })

}
