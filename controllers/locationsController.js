const router = require('express').Router();
const dayjs = require("dayjs");
const Location = require('../models/location').Location;
const Address = require('../models/location').Address;

// NEW Location FORM
router.get('/new', (req, res) => {
  res.render('locations/new.ejs');
});
// ADD EMPTY FORM TO Location SHOW PAGE TO ADD address TO A location
router.get("/:locationId", (req, res) => {
  let now = dayjs(Location.createdAt);
  Location.findById(req.params.locationId, (error, location) => {
    res.render("locations/show.ejs", { location, now });
  });
});
// CREATE A NEW LOCATION
router.post('/', (req, res) => {
  Location.create(req.body, (error, newLocation) => {
    res.send(newLocation);
    //res.redirect(`/locations/${newLocation._id}`);
  });
});

// CREATE Address EMBEDDED IN location
router.post("/:locationId/address", (req, res) => {
  console.log(req.body);
  // store new address in memory with data from request body
  const newAddress = new Address({ cityName:req.body.cityName,stateName:req.body.stateName});

  // find location in db by id and add new address
  Location.findById(req.params.locationId, (error, location) => {
    location.address.push(newAddress);
    location.save((err, location) => {
      //res.send(location)
      res.redirect(`/locations/${location.id}`);
    });
  });
});

module.exports = router;