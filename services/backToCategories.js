const { sendCategories } = require("./chatbotService");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });

const SECONDARY_RECEIVER_ID = process.env.SECONDARY_RECEIVER_ID;

module.exports.backToCategories = (sender_psid) => {
   sendCategories(sender_psid);
};

module.exports.passThreadControl = (sender_psid) => {
   return new Promise(async (resolve, reject) => {
      try {
         let request_body = {
            recipient: {
               id: sender_psid,
            },
            target_app_id: SECONDARY_RECEIVER_ID,
            metadata: "Pass thread control to inbox chat",
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
