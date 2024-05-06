const express = require("express");
const router = express.Router();

const { CountryController } = require("../../controllers");

router.get("/", CountryController.getCountries);

router.get("/country-code", CountryController.getCountryByCode);

module.exports = router;