$(document).ready(function () {
    if (localStorage.getItem("cart") == null) {
        var cart = {};
    } else {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    listcart(cart);
});
function listcart(cart) {
    let str=``;
    if (cart == {}) {
      str += `<div id="default">
      <span><h5>Your Cart is Empty........</h5></span>
    </div>`
    }
    else{
      for (let item in cart) {
          str+=`<div class="row">
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
    }
    document.getElementById("items").innerHTML=str;
}
