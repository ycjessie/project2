//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const expressLayouts=require('express-ejs-layouts');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'jessie-project2';
// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { 
    useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex: true,
        useFindAndModify:false,});
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// open the connection to mongo
db.on('open' , ()=>{});
//___________________
//configuration for the layout
//___________________
app.set('view engine','ejs')
//___________________
//Middleware
//___________________
app.use(expressLayouts);
//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
//___________________
// Routes
const arepaController = require('./controllers/arepasController.js')
app.use('/arepas', arepaController)
const ingredientController = require('./controllers/ingredientsController.js')
app.use('/ingredients', ingredientController)
const locationController = require('./controllers/locationsController.js')
app.use('/locations', locationController)
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  //res.send('Hello World!');
  
  res.render('home.ejs')
});
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));