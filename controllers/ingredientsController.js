
const router=require('express').Router();
const Arepa=require('../models/arepa')
const Ingredient = require('../models/ingredient');

//Index All Ingredient
router.get("/", async(req,res)=>{
    let allIngredient=await Ingredient.find({});
    res.render("ingredients/index.ejs",{
        ingredients:allIngredient,
    })
});
// NEW INGREDIENT GET FORM
router.get('/new', (req, res) => {
    //res.send('new router')
    res.render('ingredients/new.ejs');
  });
// CREATE POST A NEW INGREDIENT
router.post('/', async (req, res) => {
    try {
      let newIngredient = await Ingredient.create(req.body);
      //res.send(newIngredient);
      res.redirect('/ingredients')
    } catch (error) {
      res.send(error);
    }
});
//UPDATE/PUT
router.put("/:id",async (req,res)=>{
   
   await Ingredient.findByIdAndUpdate(req.params.id,req.body,(err)=>{
        try{
            res.redirect('/ingredients');
        }
        catch(error){
            res.send(error);
        }
    }) 
})
//EDIT ROUTE
router.get("/:id/edit", async(req,res)=>{
    //console.log('edit')
    //res.send(req.params.id)
   await Ingredient.findById(req.params.id,(err,foundIngredient)=>{
        try{
            res.render('ingredients/edit.ejs',{
                ingredient:foundIngredient,//send the whole kay value pairs
            });
        }catch(error){
            res.send(error);
        }
   })
})
//Delete Ingredient in Arepa
router.delete("/:id",async (req, res) => {
    console.log(req.body)
    let foundArepa = await Arepa.findOneAndUpdate(
      {id:req.params.id},
      {$pull: {ingredients: {_id:id}}},
      {new: true})
      console.log(foundArepa)
      res.send(foundArepa)
      //res.redirect("/arepas");
    //redirect back to index route
  });
module.exports=router;