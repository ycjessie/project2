const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  streetName:{type: String,unique:true,require:true},
  cityName:{type: String,unique:true,require:true},
  stateName:{type: String,unique:true,require:true},
  zipCode:{type: String,unique:true,require:true},
},{timestamps:true});

const locationSchema = new mongoose.Schema({
  name: {type: String, unique:true,require:true},
  // embed address in location
  address: [addressSchema],
},{timestamps:true});
const Location = mongoose.model('Location', locationSchema);
const Address = mongoose.model('Address', addressSchema);

module.exports = { Location, Address };