const dotenv = require("dotenv");
const { backToCategories } = require("../services/backToCategories");
const {
   sendMessageWelcomeNewUser,
   sendCategories,
   sendLookupOrder,
   requestTalkToAdmin,
   showHeadphones,
   showConsoles,
   showControllers,
   setInfoOrderByWebView,
   backToMainMenu,
   takeControlConversation,
} = require("../services/chatbotService");
const { sendMessage } = require("../services/chatboxSendMsg");

const {
   handleSetupProfileAPI,
   getFacebookUsername,
   markMessageRead,
   sendTypingOn,
} = require("../services/homePageService");

const { setInfoOrderTemplate } = require("../services/templateMessage");

dotenv.config({ path: "../config/config.env" });

module.exports.getHomepage = (req, res) => {
   res.render("homepage.ejs");
};

module.exports.getWebHook = (req, res) => {
   // Your verify token. Should be a random string.
   let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

   // Parse the query params
   let mode = req.query["hub.mode"];
   let token = req.query["hub.verify_token"];
   let challenge = req.query["hub.challenge"];

   // Checks if a token and mode is in the query string of the request
   if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
         // Responds with the challenge token from the request
         console.log("WEBHOOK_VERIFIED");
         res.status(200).send(challenge);
      } else {
         // Responds with '403 Forbidden' if verify tokens do not match
         res.sendStatus(403);
      }
   }
};

module.exports.postWebHook = (req, res) => {
   let body = req.body;

   // Checks this is an event from a page subscription
   if (body.object === "page") {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function (entry) {
         if (entry.standby) {
            // if user's message is "back" or "exit", turn on the bot again

            let webhook_standby = entry.standby[0];
            if (webhook_standby && webhook_standby.message) {
               if (
                  webhook_standby.message.text === "back" ||
                  webhook_standby.message.text === "exit"
               ) {
                  //call function to return the conversation to the primeary app
                  let sender_psid = webhook_standby.sender.id;
                  let app = "primary";
                  new Promise(async (resolve, reject) => {
                     try {
                        let target_app_id = "";
                        let metadata = "";

                        if (app === "page_inbox") {
                           target_app_id = SECONDARY_RECEIVER_ID;
                           metadata = "Pass thread control to inbox chat";
                        }
                        if (app === "primary") {
                           target_app_id = PRIMARY_RECEIVER_ID;
                           metadata =
                              "Pass thread control to the bot, primary app";
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
                              uri:
                                 "https://graph.facebook.com/v6.0/me/pass_thread_control",
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
                  takeControlConversation(webhook_standby.sender.id);
               }
            }

            console.log(entry.standby);
            return;
         }
         // Gets the body of the webhook event
         let webhook_event = entry.messaging[0];
         console.log(webhook_event);

         // Get the sender PSID
         let sender_psid = webhook_event.sender.id;

         // Check if the event is a message or postback and
         // pass the event to the appropriate handler function
         if (webhook_event.message) {
            handleMessage(sender_psid, webhook_event.message);
         } else if (webhook_event.postback) {
            handlePostback(sender_psid, webhook_event.postback);
         }
      });

      // Returns a '200 OK' response to all requests
      res.status(200).send("EVENT_RECEIVED");
   } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
   }
};

// Handles messages events
let handleMessage = async (sender_psid, received_message) => {
   //Check the incoming msg is quick replay?
   if (
      received_message &&
      received_message.quick_reply &&
      received_message.quick_reply.payload
   ) {
      let payload = received_message.quick_reply.payload;

      if (payload === "CATEGORIES") {
         await sendCategories(sender_psid);
      } else if (payload === "LOOKUP_ORDER") {
         await sendLookupOrder(sender_psid);
      } else if (payload === "TALK_ADMIN") {
         await requestTalkToAdmin(sender_psid);
      }

      return;
   }

   let response;

   // Check if the message contains text
   if (received_message.text) {
      // Create the payload for a basic text message
      response = {
         text: `You sent the message: "${received_message.text}". Now send me an image!`,
      };
   } else if (received_message.attachments) {
      // Get the URL of the message attachment
      let attachment_url = received_message.attachments[0].payload.url;
      response = {
         attachment: {
            type: "template",
            payload: {
               template_type: "generic",
               elements: [
                  {
                     title: "Is this the right picture?",
                     subtitle: "Tap a button to answer.",
                     image_url: attachment_url,
                     buttons: [
                        {
                           type: "postback",
                           title: "Yes!",
                           payload: "yes",
                        },
                        {
                           type: "postback",
                           title: "No!",
                           payload: "no",
                        },
                     ],
                  },
               ],
            },
         },
      };
   }

   // Sends the response message
   await sendMessage(sender_psid, response);
};

// Handles messaging_postbacks events
let handlePostback = async (sender_psid, received_postback) => {
   // let response;
   // Get the payload for the postback
   let payload = received_postback.payload;

   // Set the response based on the postback payload

   switch (payload) {
      case "GET_STARTED":
         await sendMessageWelcomeNewUser(sender_psid);
         break;

      case "RESTART_CONVERSATION":
         await sendMessageWelcomeNewUser(sender_psid);
         break;

      case "TALK_ADMIN":
         await requestTalkToAdmin(sender_psid);
         break;

      case "SHOW_HEADPHONES":
         await showHeadphones(sender_psid);
         break;

      case "SHOW_CONTROLLERS":
         await showControllers(sender_psid);
         break;

      case "SHOW_CONSOLES":
         await showConsoles(sender_psid);
         break;

      case "BACK_TO_CATEGORIES":
         await backToCategories(sender_psid);
         break;

      case "SET_INFO_ORDER":
         await setInfoOrderByWebView(sender_psid);
         break;

      case "BACK_TO_MAIN_MENU":
         await backToMainMenu(sender_psid);
         break;
      default:
         console.log("run default switch");
   }

   // if (payload === "yes") {
   // } else if (payload === "no") {
   // }
   // // Send the message to acknowledge the postback
};

module.exports.handleSetupFunction = async (req, res) => {
   try {
      await handleSetupProfileAPI();
      res.redirect("/");
   } catch (err) {
      console.log(err);
   }
};

module.exports.getSetupProfilePage = (req, res) => {
   res.render("profile.ejs");
};

module.exports.getInfoOrderPage = (req, res) => {
   let facebookAppId = process.env.FACEBOOK_APP_ID;
   return res.render("infoOrder.ejs", {
      facebookAppId,
   });
};

module.exports.setInfoOrder = async (req, res) => {
   try {
      let customerName = "";
      if (req.body.customerName === "") {
         customerName = "Empty";
      } else customerName = req.body.customerName;

      let response1 = {
         text: `--- Info about your lookup order ---
         \n\nCustomer name: ${customerName}
         \nPhone Number: ${parseFloat(req.body.phoneNumber)}
         \nAddress: ${req.body.address}
         \nOrder number: ${parseFloat(req.body.orderNumber)}`,
      };

      let response2 = setInfoOrderTemplate();

      // let response2 = {
      //    text: `
      //    `,
      // };

      await sendMessage(req.body.psid, response1);
      await sendMessage(req.body.psid, response2);
      return res.status(200).json({
         message: "ok",
      });
   } catch (err) {
      console.log(err);
   }
};
