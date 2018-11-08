

var mongo = require('mongoose');
var Schema = mongo.Schema;  

var recipeSchema = new Schema({
    recipesList : []
 });


var recipes = mongo.model('recipedb', recipeSchema); 

module.exports = recipes;