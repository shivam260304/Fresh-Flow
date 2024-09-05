//                THIS FILE IS THE MAIN CLIENT FILE


// This package is a popular js library used formaking http requets both from
// browser and node.js environments. It also uses promises
const axios = require("axios");
// This paack is used to display the notifications
const toastr = require("toastr");
const moment = require("moment");
const adminInit = require("./admin");

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



// Update order status with the line
  // With the help of just an input, we're getting the dta from the singleOrder.ejs to this (app.js) file
let hiddenInput = document.querySelector('#hidden-input');
let order = hiddenInput? hiddenInput.value : null;
order = JSON.parse(order);
let statuses = document.querySelectorAll('.status_line')

// The feature below is for color changing purpose
function updateStatus(order) {
  let stepCompleted = true;
  statuses.forEach((status)=>{
    let dataProp = status.dataset.status;
    if(stepCompleted){
      status.classList.add('step-completed')
    }
    if(dataProp === order.status) {
      stepCompleted = false;
      if(status.nextElementSibling){
        status.nextElementSibling.classList.add('current')
      }
    }
  })
}

updateStatus(order);

// SOCKET CLIENT SIDE CODE
let socket = io();  // (ref: line 48, layout.ejs)
// JOIN , In layout page if order exist then client needs to send(emit) a message to server
if(order){
  socket.emit('join', `order_${order._id}`)
}

const path = window.location.pathname
if(path.includes('admin')){
    adminInit();
    socket.emit('join', 'adminRoom');
}

socket.on('orderUpdated',(data)=>{
  const updatedOrder = {...order}
  updatedOrder.updatedAt = moment().format();
  updatedOrder.status = data.status;
  updateStatus(updatedOrder);
})

