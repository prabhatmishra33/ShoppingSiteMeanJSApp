

const express = require('express');
const router = express.Router();
var mongo = require("mongoose");
var recipes = require('../models/recipes.model');
var user = require('../models/user.model');
var ObjectId = require('mongodb').ObjectID;
//var appname = require('../models/appname.model');
// var groups = require('../models/groups.model');
// var todo = require('../models/usersDataSetup');
//const axios = require('axios');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
//const app = require('../server').app;
const _ = require('lodash');



/**
 * Get recipes
 */

 router.get('/api/getRecipes/',function(req,res){
  recipes.find({},{ _id:0 },function(err,data){  
      if(err){  
        res.send(err);                
      }  
      else{        
          console.log(data)
          res.send(data[0]);  
      }  
  })
 })

/**
 * Store recipes
 */ 

router.post("/api/storeRecipes/",function(req,res){   
  console.log(req.body.rcpList);
  var id = mongo.Types.ObjectId('5bba046bbfd10f3968ce8f21');

  recipes.updateOne({ _id: id } , 
    {  'recipesList': _.pick(req.body,['rcpList']) } ,{
      upsert : true
    }
      ,function(err,data){  
       if(err){  
          res.send(err);                
       }  
       else{        
           res.send({data:"Recipes stored to db..!!"});  
       }  
  });
});

/**
 * Store username details
 */
router.post("/register/",function(req,res){
  let usr = user({
    _.pick(req.body,['username','password'])
  }) 
    usr.save(function(err,success){  
      if(err){  
          res.send(err);                
      }  
      else{        
          res.send(success);  
      }  
    });
})



/* PASSPORT LOCAL AUTHENTICATION */

const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

passport.use(new LocalStrategy(
  function(username, password, done) {
    user.findOne({
      username: username
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        if (user.password != password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
         
       // console.log(token);
        return done(null, user);
      });
  }
));

passport.serializeUser(function(user, done) {
  console.log("serialize User");
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log("De-serialize User");
  done(null, user);
});

router.post('/login',passport.authenticate('local'),function(req, res) {
    console.log("=======In /login route hadler====")
    req.user.password=null;
    req.session.regenerate(function(err) {
    // will have a new session here if no error
      res.setHeader("connect.sid",req.sessionID);
      const payload = {
        user: req.user["username"] ,
        iat:Date.now(),
      };
      var token = jwt.sign(payload, 'iLoveMyLaptop', {
        //algorithm : 'none',
        // expiresInMinutes: 1440 // expires in 24 hours
        expiresIn : 100
       }); 
     /// console.log(token); 
      let usr = {
        success: true,
        username: req.user["username"],
        token: token
      };
      //console.log(req.user);
      res.send(usr);
     // res.send();
      //res.send(null);
    });
    
});

router.get('/api/logout', function(req, res){
  console.log(req.session);
  req.logout();
  res.redirect('/');
});


module.exports = router;
