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
// router.get("/:id/edit", (req, res) => {
//   Arepa.findById(req.params.id, (err, foundArepa) => {
//     if (err) res.send(err);
//     res.render("arepas/edit.ejs", {
//       arepas: foundArepa, //send the whole kay value pairs
//     });
//   });
// });

//Put ingredient to arepa
router.put('/:id/ingredients', async (req, res) => {
  console.log(req.body)
  let foundArepa = await Arepa.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        ingredients: req.body.ingredientId,
      },
    },
    function ( err ) {
      if(err){
              console.log(err);
      }else{
              console.log("Successfully added");
      }
    });
  res.redirect(`/arepas/${foundArepa.id}`);
});

//Delete Arepa
router.delete("/:id", (req, res) => {
  Arepa.findByIdAndRemove(req.params.id, (err) => {
    if (err) res.send(err);
    res.redirect("/arepas");
  });
  //redirect back to index route
});
module.exports = router;
