const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const SECONDARY_RECEIVER_ID = process.env.SECONDARY_RECEIVER_ID;
const PRIMARY_RECEIVER_ID = process.env.FACEBOOK_APP_ID;

module.exports.passThreadControl = (sender_psid, app) => {
   return new Promise(async (resolve, reject) => {
      try {
         let target_app_id = "";
         let metadata = "";

         if (app === "page_inbox") {
            target_app_id = SECONDARY_RECEIVER_ID;
            metadata = "Pass thread control to inbox chat";
         }
         if (app === "primary") {
            target_app_id = PRIMARY_RECEIVER_ID;
            metadata = "Pass thread control to the bot, primary app";
         }

         let request_body = {
            recipient: {
               id: sender_psid,
            },
            target_app_id: target_app_id,
            metadata: metadata,
         };

         // Send the HTTP request to the Messenger Platform
         request(
            {
               uri: "https://graph.facebook.com/v6.0/me/pass_thread_control",
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
