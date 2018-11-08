



var mongo = require('mongoose');
var Schema = mongo.Schema;  

var userSchema = new Schema({
    username : {
        type : String
    },
    password : {
        type : String
    }
 });


var user = mongo.model('user', userSchema); 

module.exports = user;