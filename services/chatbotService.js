const dotenv = require("dotenv");
const request = require("request");
const { sendMessage } = require("./chatboxSendMsg");

const {
   sendCategoriesTemplate,
   sendHeadphonesTemplate,
   sendLookUpTemplate,
   backToMainMenuTemplate,
} = require("./templateMessage");

const {
   getFacebookUsername,
   markMessageRead,
   sendTypingOn,
} = require("./homePageService");
dotenv.config({ path: "../config/config.env" });

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const SECONDARY_RECEIVER_ID = process.env.SECONDARY_RECEIVER_ID;
const PRIMARY_RECEIVER_ID = process.env.FACEBOOK_APP_ID;

module.exports.sendMessageWelcomeNewUser = (sender_psid) => {
   return new Promise(async (resolve, reject) => {
      try {
         let username = await getFacebookUsername(sender_psid);
         //  send text message
         let response1 = {
            text: `Hi ${username}! Welcome to TechonoluxBD, where you will find the best deal for your needs.`,
         };

         let response2 = {
            attachment: {
               type: "image",
               payload: {
                  url: "https://bit.ly/imageWelcome",
               },
            },
         };

         let response3 = {
            text:
               "At any times, use the menu below to navigate through the features",
         };

         // Send a quick reply
         let response4 = {
            text: "What can i do to help you today?",
            quick_replies: [
               {
                  content_type: "text",
                  title: "Categories",
                  payload: "CATEGORIES",
               },
               {
                  content_type: "text",
                  title: "Lookup Order",
                  payload: "LOOKUP_ORDER",
               },
               {
                  content_type: "text",
                  title: "Talk to an admin",
                  payload: "TALK_ADMIN",
               },
            ],
         };

         await sendMessage(sender_psid, response1);
         await sendMessage(sender_psid, response2);
         await sendMessage(sender_psid, response3);
         await sendMessage(sender_psid, response4);

         resolve("done");
      } catch (err) {
         reject(err);
      }
   });
};

module.exports.sendCategories = (sender_psid) => {
   return new Promise(async (resolve, reject) => {
      try {
         //  send a generic template
         let response = sendCategoriesTemplate();
         await sendMessage(sender_psid, response);
         resolve("done!");
      } catch (err) {
         reject(err);
      }
   });
};

module.exports.sendLookupOrder = (sender_psid) => {
   return new Promise(async (resolve, reject) => {
      try {
         let response = sendLookUpTemplate();
         await sendMessage(sender_psid, response);
         resolve("done!");
      } catch (err) {
         reject(err);
      }
   });
};

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

module.exports.requestTalkToAdmin = (sender_psid) => {
   return new Promise(async (resolve, reject) => {
      try {
         // send a test msg
         let response1 = {
            text: "Someone real will be with you in a few minutes ^^",
         };

         await sendMessage(sender_psid, response1);
         // Change the conversation to a page inbox
         let app = "page_inbox";

         await passThreadControl(sender_psid, app);

         resolve("done!");
      } catch (err) {
         reject(err);
      }
   });
};

module.exports.showHeadphones = (sender_psid) => {
   return new Promise(async (resolve, reject) => {
      try {
         let response = sendHeadphonesTemplate();
         await sendMessage(sender_psid, response);
         resolve("done!");
      } catch (err) {
         reject(err);
      }
   });
};

module.exports.showConsoles = (sender_psid) => {
   return new Promise(async (resolve, reject) => {
      try {
         resolve("done!");
      } catch (err) {
         reject(err);
      }
   });
};

module.exports.showControllers = (sender_psid) => {
   return new Promise((resolve, reject) => {
      try {
         resolve("done!");
      } catch (err) {
         reject(err);
      }
   });
};

module.exports.setInfoOrderByWebView = (sender_psid) => {
   return new Promise((resolve, reject) => {
      try {
         resolve("done!");
      } catch (err) {
         reject(err);
      }
   });
};

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
