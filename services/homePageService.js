const request = require("request");

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
