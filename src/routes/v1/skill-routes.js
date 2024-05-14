const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/common/passport");

const { SkillController } = require("../../controllers");

router.post("/", passport.checkAuth, SkillController.createSkill);

router.post("/getskill", passport.checkAuth, SkillController.getSkillsByName);

router.delete("/", passport.checkAuth, SkillController.destroySkill);

router.patch("/", passport.checkAuth, SkillController.updateSkill);

module.exports = router;
