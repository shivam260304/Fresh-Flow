// This package is a popular js library used formaking http requets both from
// browser and node.js environments. It also uses promises
const axios = require("axios");
// This paack is used to display the notifications
const toastr = require("toastr");
const moment = require("moment");
const init = require("./admin");

let addTocartBtn = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

addTocartBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});


// Here by clicking to a certain pizza, that pizza will be added to the session's cart
// which is sessions collection in the database
// And then we will send the selected pizza data to the cart.ejs only and no the
// whole pizza's data from the 'menus' collection
function updateCart(pizza) {
  axios.post("/update-cart", pizza).then((res) => {
    cartCounter.innerText = res.data.totalQty;
    toastr.success('Item added successfully!', 'Success',{
        timeOut: 50,
    });
  }).catch(err =>{
    toastr.error('Something went wrong!', 'Error',{
        timeOut: 50,
    });
  });
}

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}

init();