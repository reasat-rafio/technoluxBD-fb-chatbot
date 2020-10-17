// load FB SDK
(function (d, s, id) {
   var js,
      fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {
      return;
   }
   js = d.createElement(s);
   js.id = id;
   js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
   fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "Messenger");

window.extAsyncInit = function () {
   // the Messenger Extensions JS SDK is done loading
   MessengerExtensions.getContext(
      facebookAppId,
      function success(thread_context) {
         // success
         //  set psid to input
         $("#psid").val(thread_context.psid);
         handleClickButtonFindOrder();
      },
      function error(err) {
         // error
         console.log("err", err);
      }
   );
};

function validateInputField() {
   const NUMBER_REG = /^(?:\+88|88)?(01[3-9]\d{8})$/;

   let number = $("#customerNumber");
   let orderNumber = $("#orderNumber");
   let address = $("#address");
   let name = $("customerName");

   if (!number.val().match(NUMBER_REG)) {
      number.addClass("is-invalid");
      return true;
   } else {
      number.removeClass("is-invalid");
   }

   if (orderNumber.val() === "") {
      orderNumber.addClass("is-invalid");
      return true;
   } else {
      orderNumber.removeClass("is-invalid");
   }

   if (name.val() === "") {
      name.addClass("is-invalid");
      return true;
   } else {
      name.removeClass("is-invalid");
   }

   if (address.val() === "") {
      address.addClass("is-invalid");
      return true;
   } else {
      address.removeClass("is-invalid");
   }

   return false;
}

function handleClickButtonFindOrder() {
   $("#btnFindOrder").on("click", function (e) {
      let check = validateInputField();

      let data = {
         psid: $("#psid").val(),
         customerName: $("#customerName").val(),
         phoneNumber: $("#number").val(),
         orderNumber: $("orderNumber").val(),
         address: $("#address").val(),
      };
      if (!check) {
         //  Close web view
         MessengerExtensions.requestCloseBrowser(
            function success() {
               // webview closed
            },
            function error(err) {
               // an error occurred
               console.log(err);
            }
         );

         // send data to node.js server

         $.ajax({
            url: `${window.location.origin}/set-info-order`,
            method: "POST",
            data: data,
            success: function (data) {
               console.log(data);
            },
            error: function (error) {
               console.log(error);
            },
         });
      }
   });
}
