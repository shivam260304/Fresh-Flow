import {loadStripe} from '@stripe/stripe-js'
import {placeOrder} from './apiService';

export async function initStripe() {
  const stripe = await loadStripe('pk_test_51PxZecRwvYrpn3DpJa0u2Lkm4VWVgKGAtZMZ5KryTazxQSyENy1INf8ve8z3FYmOPEZb9ae3bd2zmLFPBrLpUSSn00ZjzileGc')

  let card = null;


  function mountWidget() {
    const elements = stripe.elements();
    let style = {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    };

    card = elements.create("card", { style, hidePostalCode: true });
    card.mount("#card-element");
  }

  const paymentType = document.querySelector("#paymentType");
  if(!paymentType){
    return;
  }
  paymentType.addEventListener("change", (e) => {
    if (e.target.value === "card") {
        mountWidget();
    } else {
        card.destroy();
    }
  });
  // AJAX CALL
  const paymentForm = document.querySelector("#payment-form");
  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let formData = new FormData(paymentForm);
      let formObject = {};
      for (let [key, value] of formData.entries()) {
        formObject[key] = value;
      }

    //   VERIFY CARD
    if(card!==null) {
        stripe.createToken(card).then((result)=>{
            // Storing the created token;s id in formObject
            formObject.stripeToken = result.token.id
            placeOrder(formObject);
        }).catch((err)=>{
            console.log(err);
        })
    }else{
        placeOrder(formObject);
        return;
    }
    });
  }
}
