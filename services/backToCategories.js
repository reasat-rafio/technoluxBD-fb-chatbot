const { sendCategories } = require("./chatbotService");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const SECONDARY_RECEIVER_ID = process.env.SECONDARY_RECEIVER_ID;
const PRIMARY_RECEIVER_ID = process.env.FACEBOOK_APP_ID;

module.exports.backToCategories = (sender_psid) => {
   sendCategories(sender_psid);
};
