const request = require("request");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

module.exports.handleSetupProfileAPI = () => {
   return new Promise((resolve, reject) => {
      try {
         let url = `https://graph.facebook.com/v8.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`;
         let request_body = {
            get_started: {
               payload: "GET_STARTED",
            },
            persistent_menu: [
               {
                  locale: "default",
                  composer_input_disabled: false,
                  call_to_actions: [
                     {
                        type: "postback",
                        title: "Talk to an agent",
                        payload: "CARE_HELP",
                     },
                     {
                        type: "postback",
                        title: "Outfit suggestions",
                        payload: "CURATION",
                     },
                     {
                        type: "web_url",
                        title: "Shop now",
                        url: "https://www.originalcoastclothing.com/",
                        webview_height_ratio: "full",
                     },
                  ],
               },
            ],
            whitelisted_domains: ["https://techoluxbd-bot.herokuapp.com/"],
         };

         // Send the HTTP request to the Messenger Platform
         request(
            {
               uri: url,
               method: "POST",
               json: request_body,
            },
            (err, res, body) => {
               if (!err) {
                  resolve("Done!");
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

module.exports.getFacebookUsername = (sender_psid) => {
   return new Promise((resolve, reject) => {
      try {
         // curl -X GET ""

         // Send the HTTP request to the Messenger Platform
         let url = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;
         request(
            {
               uri: url,
               method: "GET",
            },
            (err, res, body) => {
               if (!err) {
                  body = JSON.parse(body);
                  let username = `${body.last_name} ${body.first_name}`;
                  resolve(username);
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
