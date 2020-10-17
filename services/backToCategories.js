const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });

const { sendCategories } = require("./chatbotService");
const SECONDARY_RECEIVER_ID = process.env.SECONDARY_RECEIVER_ID;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

module.exports.backToCategories = (sender_psid) => {
   sendCategories(sender_psid);
};

// module.exports.passThreadControl = (sender_psid) => {
//    return new Promise(async (resolve, reject) => {
//       try {
//          let request_body = {
//             recipient: {
//                id: sender_psid,
//             },
//             target_app_id: SECONDARY_RECEIVER_ID,
//             metadata: "Pass thread control to inbox chat",
//          };

// curl -X POST -H "Content-Type: application/json" -d '{
//    "recipient":{"id":"<PSID>"},
//    "target_app_id":123456789,
//    "metadata":"String to pass to secondary receiver app"
//  }' "https://graph.facebook.com/v2.6/me/pass_thread_control?access_token=<PAGE_ACCESS_TOKEN>"

// Send the HTTP request to the Messenger Platform
//          request(
//             {
//                uri: "https://graph.facebook.com/v2.6/me/pass_thread_control",
//                qs: { access_token: PAGE_ACCESS_TOKEN },
//                method: "POST",
//                json: request_body,
//             },
//             (err, res, body) => {
//                if (!err) {
//                   resolve("message sent!");
//                } else {
//                   reject("Unable to send message:" + err);
//                }
//             }
//          );
//          // resolve("done!");
//       } catch (err) {
//          reject(err);
//       }
//    });
// };

module.exports.passThreadControl = (sender_psid) => {
   return new Promise(async (resolve, reject) => {
      try {
         // Construct the message body
         let request_body = {
            recipient: {
               id: SECONDARY_RECEIVER_ID,
            },
            target_app_id: response,
            metadata: "String to pass to secondary receiver app",
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
         // resolve("done!");
      } catch (e) {
         reject(e);
      }
   });
};
