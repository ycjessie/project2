const router = require("express").Router();
const Arepa = require("../models/arepa");
const Ingredient = require("../models/ingredient");

//Create New Arepa to get all Ingredients
router.get("/new", async (req, res) => {
  let allIngredient = await Ingredient.find({});
  res.render("arepas/new.ejs", {
    ingredients: allIngredient,
  });
});
//Index All Arepa
router.get("/", async (req, res) => {
  let allarepas = await Arepa.find({});
  res.render("arepas/index.ejs", {
    arepas: allarepas,
  });
});
//Home 
router.get("../", async (req, res) => {
  let allarepas = await Arepa.find({});
  res.render("../home.ejs", {
    arepas: allarepas,
  });
});
//Show Arepa
router.get("/:id", async (req, res) => {
  let allIngredients = await Ingredient.find({});
  let foundArepas = await Arepa.findById(req.params.id).populate({
    path: "ingredients",
    option: { sort: { name: "desc" } },
  });
  //res.send(foundArepas)
  res.render("arepas/show.ejs", {
    arepas: foundArepas,
    ingredients: allIngredients,
  });
});
// CREATE  A NEW/Post AREPA
router.post("/", async (req, res) => {
  //passing the checkbox by objectId
  console.log(req.body);
  let newArepa = await Arepa.create(req.body);
  res.redirect(`/arepas/${newArepa.id}`);
});
//EDIT ROUTE
router.get("/:id/edit", async (req, res) => {
  
  try{
    let allIngredients = await Ingredient.find({});
    let foundArepas = await Arepa.findById(req.params.id).populate({
      path: "ingredients",
      option: { sort: { name: "desc" } },
    });
      //res.send(foundArepas)
    res.render("arepas/edit.ejs",{
      arepas:foundArepas,
      ingredients: allIngredients,
    })
  }catch(err){
    console.log(err)
    res.send('see terminal')
  }
});
//Update/Put Arepa
router.put("/:arepaId/", async (req, res) => {
  console.log(req.body);
  //res.send('see terminal')
  try{
    let foundArepa = await Arepa.findByIdAndUpdate(req.params.arepaId,req.body)
      res.redirect("/arepas")
      // res.send(fo)
    }catch(error){
      console.log(error)

    }
 
});
//Update/Put Ingredient to arepa
router.put("/:id/ingredients", async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  let foundArepa = await Arepa.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        ingredients: req.body.ingredientId,
      },
    },
    { new: true, upsert: true }
  );
  console.log(foundArepa);

  res.redirect(`/arepas/${foundArepa.id}`);
});
//Delete Ingredent in Arepa
router.delete("/:ingredientId/:arepaId", async (req, res) => {
  console.log(req.params.ingredientId)
  console.log(req.params.arepaId)
  //res.send('see the terminal')
  try{
    let foundArepa=await Arepa.findOneAndUpdate(
      { _id: req.params.arepaId },
      {$pull: { ingredients:req.params.ingredientId}},
      { new: true });//console.log(foundArepa)
    //res.send(foundArepa)
    res.redirect(`/arepas/${foundArepa.id}`);
  }catch(err){
    console.error(err);
    res.send('see the terminal')
  }
});
//Delete Arepa
router.delete("/:arepaId", async (req, res) => {
    console.log(req.params.arepaId)
    //res.send('see the terminal')
  try{
        let foundArepa=await Arepa.findByIdAndRemove({_id:req.params.arepaId})
        res.redirect("/arepas");
  }catch(error){
      console.log(error)
      res.send('see the terminal')
    }
    
  // );

  //redirect back to index route
});

module.exports = router;
