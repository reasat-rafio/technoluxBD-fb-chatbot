const dotenv = require("dotenv");
const request = require("request");
const { sendMessage } = require("./chatboxSendMsg");
const {
   getFacebookUsername,
   markMessageRead,
   sendTypingOn,
} = require("./homePageService");
dotenv.config({ path: "../config/config.env" });

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

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
                  payload: "CATAGORIES",
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
