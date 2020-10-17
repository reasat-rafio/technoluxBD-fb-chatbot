const { Router } = require("express");
const {
   getHomepage,
   getWebHook,
   postWebHook,
   handleSetupFunction,
   getSetupProfilePage,
   getInfoOrderPage,
   setInfoOrder,
} = require("../controllers/homepageController");
const router = Router();

router.get("/", getHomepage);

router.get("/webhook", getWebHook);

router.post("/webhook", postWebHook);

router.post("/set-up-profile", handleSetupFunction);

router.get("/set-up-profile", getSetupProfilePage);

router.get("/info-order", getInfoOrderPage);

router.post("/set-info-order", setInfoOrder);

module.exports = router;
