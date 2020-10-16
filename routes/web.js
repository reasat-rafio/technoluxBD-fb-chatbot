const { Router } = require("express");
const {
   getHomepage,
   getWebHook,
   postWebHook,
} = require("../controllers/homepageController");
const router = Router();

router.get("/", getHomepage);

router.get("/webhook", getWebHook);

router.post("/webhook", postWebHook);

module.exports = router;
