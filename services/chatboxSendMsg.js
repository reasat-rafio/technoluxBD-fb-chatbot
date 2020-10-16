const dotenv = require("dotenv");
const request = require("request");
const {
   getFacebookUsername,
   markMessageRead,
   sendTypingOn,
} = require("./homePageService");
dotenv.config({ path: "../config/config.env" });

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

module.exports.sendMessage = (sender_psid, response) => {
   return new Promise(async (resolve, reject) => {
      try {
         await markMessageRead(sender_psid);
         await sendTypingOn(sender_psid);
         // Construct the message body
         let request_body = {
            recipient: {
               id: sender_psid,
            },
            message: response,
         };

         // Send the HTTP request to the Messenger Platform
         request(
            {
               uri: "https://graph.facebook.com/v6.0/me/messages",
               qs: { access_token: PAGE_ACCESS_TOKEN },
               method: "POST",
               json: request_body,
            },
            (err, res, body) => {
               if (!err) {
                  resolve("message sent!");
               } else {
                  reject("Unable to send message:" + err);
               }
            }
         );
      } catch (err) {
         reject(err);
      }
   });
};
