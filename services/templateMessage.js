module.exports.sendCategoriesTemplate = () => {
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
                     url: "https://petersfancybrownhats.com/view?item=103",
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
                        payload: "SHOW_HEADPHONES",
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
                     url: "https://petersfancybrownhats.com/view?item=103",
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
                        payload: "SHOW_CONTROLLERS",
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
                     url: "https://petersfancybrownhats.com/view?item=103",
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
                        payload: "SHOW_CONSOLES",
                     },
                  ],
               },
            ],
         },
      },
   };
   return response;
};

module.exports.sendHeadphonesTemplate = () => {
   let response = {
      attachment: {
         type: "template",
         payload: {
            template_type: "generic",
            elements: [
               {
                  title:
                     "Lenovo Livepods LP1 TWS IPX4 Waterproof Earbuds Sport Bluetooth For Android and iPhone",
                  image_url:
                     "https://i.ebayimg.com/images/g/bfkAAOSwWHtfMMTy/s-l640.jpg",
                  subtitle: "139 taka",
                  default_action: {
                     type: "web_url",
                     url: "https://petersfancybrownhats.com/view?item=103",
                     webview_height_ratio: "tall",
                  },
                  buttons: [
                     {
                        type: "web_url",
                        url: "https://petersfancybrownhats.com",
                        title: "Order Now",
                     },
                     {
                        type: "postback",
                        title: "Back to catagories",
                        payload: "BACK_TO_CATEGORIES",
                     },
                     {
                        type: "postback",
                        title: "Main menu",
                        payload: "BACK_TO_MAIN_MENU",
                     },
                  ],
               },

               {
                  title: "Wavefun Xpods 3T TWS Earphone ",
                  image_url:
                     "http://bondsmaking.jp/wp-content/uploads/2020/01/736518172-1.jpg",
                  subtitle: "138 taka",
                  default_action: {
                     type: "web_url",
                     url: "https://petersfancybrownhats.com/view?item=103",
                     webview_height_ratio: "tall",
                  },
                  buttons: [
                     {
                        type: "web_url",
                        url: "https://petersfancybrownhats.com",
                        title: "Order Now",
                     },
                     {
                        type: "postback",
                        title: "Back to catagories",
                        payload: "BACK_TO_CATEGORIES",
                     },
                     {
                        type: "postback",
                        title: "Main menu",
                        payload: "BACK_TO_MAIN_MENU",
                     },
                  ],
               },

               {
                  title: "Plextone G20",
                  image_url: "https://i.ytimg.com/vi/xrdP8j2gv5k/hqdefault.jpg",
                  subtitle: "137 taka",
                  default_action: {
                     type: "web_url",
                     url: "https://petersfancybrownhats.com/view?item=103",
                     webview_height_ratio: "tall",
                  },
                  buttons: [
                     {
                        type: "web_url",
                        url: "https://petersfancybrownhats.com",
                        title: "Order Now",
                     },
                     {
                        type: "postback",
                        title: "Back to catagories",
                        payload: "BACK_TO_CATEGORIES",
                     },
                     {
                        type: "postback",
                        title: "Main menu",
                        payload: "BACK_TO_MAIN_MENU",
                     },
                  ],
               },
            ],
         },
      },
   };
   return response;
};

module.exports.sendLookUpTemplate = () => {
   let response = {
      attachment: {
         type: "template",
         payload: {
            template_type: "button",
            text:
               "Give us the info about your order, so we won't need to ask for it again in the future.",
            buttons: [
               {
                  type: "web_url",
                  url: `${process.env.URL_WEB_VIEW_ORDER}`,
                  title: "Info Lookup Order",
                  webview_height_ratio: "tall",
                  messenger_extensions: true,
               },
               {
                  type: "postback",
                  title: "Main menu",
                  payload: "BACK_TO_MAIN_MENU",
               },
            ],
         },
      },
   };
   return response;
};

module.exports.backToMainMenuTemplate = () => {
   return {
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
};
