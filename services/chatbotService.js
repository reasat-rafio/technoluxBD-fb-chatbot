const dotenv = require("dotenv");
const request = require("request");
const { response } = require("express");
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
               qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
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
