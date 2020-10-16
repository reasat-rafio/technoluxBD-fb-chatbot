const { Router } = require("express");
const {
   getHomepage,
   getWebHook,
   postWebHook,
   handleSetupFunction,
} = require("../controllers/homepageController");
const router = Router();

router.get("/", getHomepage);

router.get("/webhook", getWebHook);

router.post("/webhook", postWebHook);

router.post("/set-up-profile", handleSetupFunction);

module.exports = router;
