
const router=require('express').Router();
const Ingredient = require('../models/ingredient');

//All Ingredient
router.get("/", async(req,res)=>{
    let allIngredient=await Ingredient.find({});
    res.render("ingredients/index.ejs",{
        ingredients:allIngredient,
    })
});
// NEW INGREDIENT FORM
router.get('/new', (req, res) => {
    //res.send('new router')
    res.render('ingredients/new.ejs');
  });
// CREATE A NEW INGREDIENT
router.post('/', async (req, res) => {
    try {
      let newIngredient = await Ingredient.create(req.body);
      //res.send(newIngredient);
      res.redirect('/ingredients')
    } catch (error) {
      res.send(error);
    }

});
module.exports=router;