const mongoose = require('mongoose');

const arepaSchema = new mongoose.Schema({
  name: {
    type: String,
    trim:true,
    default: '',
    require:true,
  },
  image: {
    type: String,
    default: '',
    require:true,
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
  ],
},{timestamps:true});

module.exports = mongoose.model('Arepa', arepaSchema);