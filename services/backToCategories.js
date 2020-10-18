const { sendCategories } = require("./chatbotService");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });

module.exports.backToCategories = (sender_psid) => {
   sendCategories(sender_psid);
};

module.exports.passThreadControl = (sender_psid) => {};
