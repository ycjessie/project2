const router = require('express').Router();
const Location = require('../models/location').Location;
const Address = require('../models/location').Address;

// NEW Location FORM
router.get('/new', (req, res) => {
  res.render('locations/new.ejs');
});
// ADD EMPTY FORM TO Location SHOW PAGE TO ADD address TO A location
router.get("/:locationId", (req, res) => {
  // find location in db by id and add new address
  let now = dayjs(Location.createdAt);
  Location.findById(req.params.userId, (error, locaton) => {
    res.render("users/show.ejs", { location, now });
  });
});
// CREATE A NEW LOCATION
router.post('/', (req, res) => {
  Location.create(req.body, (error, newLocation) => {
    //res.send(newLocation);
    res.redirect(`/user/${newLocation._id}`);
  });
});

module.exports = router;