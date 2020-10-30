const mongoose = require('mongoose');


const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    unique:true,//avoid dups
  },
  
},{timestamps:true});

module.exports = mongoose.model('Ingredient', ingredientSchema);