import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from "react-redux";
import store from "./store";
import routes from './routes';
import NotFoundPage from './pages/NotFound';
const bodyParser = require('body-parser');
import { Field,Control,Form,combineForms } from "react-redux-form";

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static('static'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
var today = new Date();
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

app.get('/currentRates', (req, res) => {
    knex.withSchema('BrokerPortal').select('LineID','Utility','PremiseType','Profile','AnnualUsageLowerBound','AnnualUsageUpperBound', 'StartDate','ContractLength','ContractRate').from('RateListCumulative').where({
        IsDeleted:0
    })
    // console.log(query.toString());
    //Above query gives
    //select * from [BrokerPortal].[RateListCumulative] where [IsDeleted] = 0
    .asCallback(function(err,results) {
      if (err)    {
          console.log("error retrieving rates");
          res.send({success:false,message:err.message});
          }
      else{
          //console.log("Got column response as ",results);
          var rates = results;
          return res.send(rates);
          }
    });
});

app.get('/prospects', (req, res) => {
    // console.log(req.body);
    knex.withSchema('BrokerPortal').select('ProspectID','ProspectEntityName').from('Prospects')
    //where BrokerID in BrokerProspect
    .asCallback(function(err,results) {
      if (err)    {
          console.log("error retrieving prospects");
          res.send({success:false,message:err.message});
          }
      else{
          console.log("Query executed successfully");
          var prospects = results;
          return res.send(prospects);
          }
      });
});

app.post("/submitProspect", (req, res) => {
    console.log("In server now.");
    console.log("Req.body");
    console.log(req.body);
    console.log("logging original and edited prospects next");
    var prospect = req.body;
    console.log(prospect);
    prospect.CreatedBy = 'TestValueFrom NewProspectForm';
    console.log(prospect);
    knex.withSchema('BrokerPortal').insert(prospect).into('Prospects').returning('ProspectID')
    .asCallback(function(err,results) {
      if (err)    {
          console.log("error adding prospect");
          res.send({success:false,message:err.message});
          }
      else{
          console.log("Query executed successfully");
          var prospectID = results;
          console.log("prospect ID returned",prospectID[0]);
          if (typeof prospectID === "undefined") {
              return res.send({success:false,message:"Unable to insert- check validity of data submited"});
          } else {
          return res.send({success:true,prospectID:prospectID[0]});
        }}
      });
});
// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<Provider store={store}><RouterContext {...renderProps}/></Provider>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
