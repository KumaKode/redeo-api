const express = require("express");
const router = express.Router();

const { SocialLinksController } = require("../../controllers");

router.post("/", SocialLinksController.addSocialLinks);

router.get(
  "/jobseeker-links/:id",
  SocialLinksController.getAllSocialLinksByJobSeekerId
);

router.get(
  "/employer-links/:id",
  SocialLinksController.getAllSocialLinksByEmployerId
);

router.delete("/:id", SocialLinksController.destroySocialLink);

router.patch("/:id", SocialLinksController.updateSocialLink);

module.exports = router;
