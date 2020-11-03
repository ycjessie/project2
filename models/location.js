const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  cityName:{type:String},
  stateName:{type:String,unique:true},
 // stateName:{type: String,unique:true,require:true},
},{timestamps:true});

const locationSchema = new mongoose.Schema({
  name: String,
  // embed address in location
  address: [addressSchema],
},{timestamps:true});
const Location = mongoose.model('Location', locationSchema);
const Address = mongoose.model('Address', addressSchema);

module.exports = { Location, Address };