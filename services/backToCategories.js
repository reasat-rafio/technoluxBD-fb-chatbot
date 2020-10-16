const { sendCategories } = require("./chatbotService");

module.exports.backToCategories = (sender_psid) => {
   sendCategories(sender_psid);
};
