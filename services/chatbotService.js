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
         //   send a generic template
         let response = {
            attachment: {
               type: "template",
               payload: {
                  template_type: "generic",
                  elements: [
                     {
                        title: "Headphone",
                        image_url:
                           "https://images.unsplash.com/photo-1520170350707-b2da59970118?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
                        subtitle: "We have the right Headphones for everyone.",
                        default_action: {
                           type: "web_url",
                           url:
                              "https://petersfancybrownhats.com/view?item=103",
                           webview_height_ratio: "tall",
                        },
                        buttons: [
                           {
                              type: "web_url",
                              url: "https://petersfancybrownhats.com",
                              title: "View on Website",
                           },
                           {
                              type: "postback",
                              title: "Show Headphones",
                              payload: "DEVELOPER_DEFINED_PAYLOAD",
                           },
                        ],
                     },

                     {
                        title: "Controller",
                        image_url:
                           "https://images.unsplash.com/photo-1585881728919-5c0ce925ad10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                        subtitle: "We have the right controller for everyone.",
                        default_action: {
                           type: "web_url",
                           url:
                              "https://petersfancybrownhats.com/view?item=103",
                           webview_height_ratio: "tall",
                        },
                        buttons: [
                           {
                              type: "web_url",
                              url: "https://petersfancybrownhats.com",
                              title: "View Website",
                           },
                           {
                              type: "postback",
                              title: "Show Controllers",
                              payload: "DEVELOPER_DEFINED_PAYLOAD",
                           },
                        ],
                     },

                     {
                        title: "Console",
                        image_url:
                           "https://images.unsplash.com/photo-1588495752527-77d65c21f7cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        subtitle: "We have the right Console for everyone.",
                        default_action: {
                           type: "web_url",
                           url:
                              "https://petersfancybrownhats.com/view?item=103",
                           webview_height_ratio: "tall",
                        },
                        buttons: [
                           {
                              type: "web_url",
                              url: "https://petersfancybrownhats.com",
                              title: "View Website",
                           },
                           {
                              type: "postback",
                              title: "Show Consoles",
                              payload: "DEVELOPER_DEFINED_PAYLOAD",
                           },
                        ],
                     },
                  ],
               },
            },
         };
         await sendMessage(sender_psid, response);
         resolve("done!");
      } catch (err) {
         reject(err);
      }
   });
};

module.exports.sendLookupOrder = (sender_psid) => {
   return new Promise((resolve, reject) => {
      try {
         resolve("done!");
      } catch (err) {
         reject(err);
      }
   });
};

module.exports.requestTalkToAdmin = (sender_psid) => {
   return new Promise((resolve, reject) => {
      try {
         resolve("done");
      } catch (err) {
         reject(err);
      }
   });
};
