const mongoose = require('mongoose');

const Arepa = require('./models/arepa');
const Ingredient = require('./models/ingredient');

const MONGODB_URI = 'mongodb://localhost:27017/'+ 'jessie-project2';
mongoose.connect(
    MONGODB_URI,
  { useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify:false,});
  () => {
    console.log('the connection with mongod is established');
  };

async function seed() {
  // CREATE INGREDIENTS
  const shredBeef = await Ingredient.create({
    name: 'Shredded Beef',
  });
  const shredPork = await Ingredient.create({
    name: 'Shredded Pork',
  });
  const avocado = await Ingredient.create({
    name: 'Avocado',
  });

  const plaintain = await Ingredient.create({
    name: 'Sweet Plaintain',
  });
  const blackbean = await Ingredient.create({
    name: 'Black Beans',
  });

  const whiteCheese = await Ingredient.create({
    name: 'White Cheese',
  });

  // CREATE A NEW Arepa
  const Pabellon = new Arepa({
    name: 'Arepa Pabellon',
    ingredients: [],
  });

  const Rumbera = new Arepa({
    name: 'Arepa Rumbera',
    ingredients: [],
  });

  // // PUSH THE INGREDIENTS ONTO THE Arepa'S
  // // INGREDIENTS ARRAY
  Pabellon.ingredients.push(shredBeef);
  Pabellon.ingredients.push(plaintain); // associated!
  Pabellon.ingredients.push(blackbean); // associated!
  Pabellon.save(function (err, saved) {
    if (err) {
      console.log(err);
    } else {
      console.log('Pabellon is ', saved);
    }
  });
  Rumbera.ingredients.push(shredPork);
  Rumbera.ingredients.push(avocado); // associated!
  
  Rumbera.save(function (err, saved) {
    if (err) {
      console.log(err);
    } else {
      console.log('Rumbera is ', saved);
    }
  });
}

seed();