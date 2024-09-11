const axios = require("axios");

export function placeOrder(formObject){
    axios
        .post("/order", formObject)
        .then((res) => {
            window.location.href = "/customerOrder";
          console.log("Order Placed");
        })
        .catch((err) => {
          console.log(err);
        });
}