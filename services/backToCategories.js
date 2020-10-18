const { sendCategories } = require("./chatbotService");
const dotenv = require("dotenv");
const { backToMainMenuTemplate } = require("./templateMessage");
dotenv.config({ path: "../config/config.env" });

module.exports.backToCategories = (sender_psid) => {
   sendCategories(sender_psid);
};

module.exports.passThreadControl = (sender_psid) => {};

module.exports.backToMainMenu = (sender_psid) => {
   return new Promise(async (resolve, reject) => {
      try {
         let response = backToMainMenuTemplate();
         await sendMessage(sender_psid, response);
         resolve("done!");
      } catch (err) {
         reject(err);
      }
   });
};
