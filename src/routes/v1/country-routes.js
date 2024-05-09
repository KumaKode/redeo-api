const express = require("express");
const router = express.Router();

const { CountryController } = require("../../controllers");

router.get("/", CountryController.getCountries);

router.post("/", CountryController.getCountry);

module.exports = router;
