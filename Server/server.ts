// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';

import { enableProdMode } from '@angular/core';


// Get dependencies
const express = require('express');
import { join } from 'path';
const http = require('http');
const bodyParser = require('body-parser');
var mongo = require("mongoose");
var morgan = require('morgan');
const passport = require('passport');
var session = require('express-session');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
// Get our API routes
const api = require('./routes/api');
import { readFileSync } from 'fs';
const DIST_FOLDER = join(process.cwd(), 'dist');

// var ObjectId = require('mongodb').ObjectID;


// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

/*
* MongoDB Connection
*/
var db = mongo.connect("mongodb://localhost:27017/ShoppingSite",  { useNewUrlParser: true },function(err, response){  
   if(err){ console.log( err); }  
   else{ console.log('Connected to MongoDB'); 
    return response;
  }  
}); 
  


//sessionStore = db;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.set('superSecret', 'iLoveMyLaptop');// secret variable



// // Point static path to dist
// app.use(express.static(path.join(__dirname, 'dist')));

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack


const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./../dist/project-server/main');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

//app.use(express.cookieParser());
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//express session

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());



app.use('/',function(req,res,next){
  console.log()
  console.log(req.method," : ",req.url);
  next()
});

// route middleware to verify a token
app.use('/api/*',function(req, res, next) {

  // check header or url parameters or post parameters for token
  console.log("Middleware");
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        console.log("Token Error!!!!!");
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    console.log("Token Error!!!!!");
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

// Set our api routes
app.use('/', api);





//Catch all other routes and return the index file
// app.get('*', (req, res) => {
//   // console.log()
//   // console.log(req.url)
//   console.log(path.join(__dirname, 'dist/index.html'));
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });



// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

// Start up the Node server
app.listen(port, () => {
  console.log(`Node server listening on http://localhost:${port}`);
});

// /**
//  * Create HTTP server.
//  */
// const server = http.createServer(app);

// /**
//  * Listen on provided port, on all network interfaces.
//  */
// server.listen(port, () => console.log(`API running on localhost:${port}`));


module.exports = app;

