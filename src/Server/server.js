// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var mongo = require("mongoose");
var morgan = require('morgan');
const passport = require('passport');
var session = require('express-session');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
// Get our API routes
const api = require('./routes/api');

// var ObjectId = require('mongodb').ObjectID;


const app = express();

/*
* MongoDB Connection
*/
var db = mongo.connect("mongodb://localhost:27017/ShoppingSite", function(err, response){  
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



// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
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

///app.use(morgan(':method :url'));






//Catch all other routes and return the index file
app.get('*', (req, res) => {
  // console.log()
  // console.log(req.url)
  console.log(path.join(__dirname, 'dist/index.html'));
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// app.all('*',(req, res) => {
//   console.log(req.url);
//   console.log()
// })

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port)

// /**
//  * Create HTTP server.
//  */
// const server = http.createServer(app);

// /**
//  * Listen on provided port, on all network interfaces.
//  */
// server.listen(port, () => console.log(`API running on localhost:${port}`));


module.exports = app;

