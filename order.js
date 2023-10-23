$(document).ready(function () {
    if (localStorage.getItem("cart") == null) {
        var cart = {};
    } else {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    listcart(cart);
});
function listcart(cart) {
  let str_order=``;
  for (let item in cart) {
      str_order+=`<div class="row">
      <div class="col">
        `+cart[item].name+`
      </div>
      <div class="col">
        x`+ cart[item].quantity +`
      </div>
      <div class="col">
        = Rs.`+ (cart[item].price)*(cart[item].quantity) +`
      </div>
    </div>`
  }

  if(str_order == ``) str_order = `<h5 class='default'> Your Cart is Empty. Click here to Go to Menu </h5>`;
  document.getElementById("items").innerHTML= str_order;
}
