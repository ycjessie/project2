
const router=require('express').Router();
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
//Delete Ingredient
router.delete("/:id", (req, res) => {
    Ingredient.findByIdAndRemove(req.params.id, (err) => {
      if (err) res.send(err);
      res.redirect("/arepas");
    });
    //redirect back to index route
});
module.exports=router;