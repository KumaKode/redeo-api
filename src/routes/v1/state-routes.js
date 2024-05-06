const express = require("express");
const router = express.Router();

const { StateController } = require("../../controllers");

router.post("/", StateController.createState);

//router.get("/", StateController.getStates);

router.get("/country-code", StateController.getStatesByCountryCode);

router.delete("/:id", StateController.destroyState);

router.patch("/:id", StateController.updateState);

module.exports = router;
