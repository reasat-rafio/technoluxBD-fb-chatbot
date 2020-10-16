const { Router } = require("express");
const {
   getHomepage,
   getWebHook,
   postWebHook,
   handleSetupFunction,
   getSetupProfilePage,
} = require("../controllers/homepageController");
const router = Router();

router.get("/", getHomepage);

router.get("/webhook", getWebHook);

router.post("/webhook", postWebHook);

router.post("/set-up-profile", handleSetupFunction);

router.get("/set-up-profile", getSetupProfilePage);

module.exports = router;
