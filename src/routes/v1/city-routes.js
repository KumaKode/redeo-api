const express = require("express");
const router = express.Router();

const { CityController } = require("../../controllers");

router.post("/", CityController.createCity);

router.get("/", CityController.getCities);

router.get("/country-state", CityController.getCitiesByCountryAndStateCode);

router.delete("/:id", CityController.destroyCity);

router.patch("/:id", CityController.updateCity);

module.exports = router;
