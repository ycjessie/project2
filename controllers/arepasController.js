
const router=require('express').Router();
const Arepa = require('../models/arepa');

//Index All Arepa
router.get("/", async(req,res)=>{
    let allarepas=await Arepa.find({});
    res.render("arepas/index.ejs",{
        arepas:allarepas,
    })
});
// NEW AREPA GET FORM
router.get('/new',  (req, res) => {
    //res.send('new router')
    res.render('arepas/new.ejs');
  });
// CREATE POST A NEW AREPA
router.post('/', async (req, res) => {
    try {
      let newArepa = await Arepa.create(req.body);
      //res.send(newArepa);
      res.redirect('/arepa')
    } catch (error) {
      res.send(error);
    }
});

module.exports=router;