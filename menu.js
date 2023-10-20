$(document).ready(function () {

    // create cart object or get it if it already exists
    if (localStorage.getItem("cart") == null) {
        var cart = {};
    } else {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    updatecart(cart);
    $(".sidebar").hide();

    // if add to cart button is clicked, add that item to cart
    $(".add").on("click",".cart",function () {
        var ids = $(this).attr("id");
        if (cart[ids] != undefined) {
            cart[ids].quantity += 1;

        } else {
            let itemname = $("#item"+ids).text();
            let itemprice = $("#price"+ids).text();
            itemprice = parseInt(itemprice.slice(3,));
            cart[ids] = {name:itemname,price:itemprice,quantity:1};
        }
        updatecart(cart);  
    });


    // show and hide cart
    $(".cartsidebar").click(function () {
        $(".sidebar").show(500);
        $(this).hide();
    });
    
    $(".close").click(function () {
        $(".sidebar").hide(500);
        $(".cartsidebar").show();
    });


    // adjust the quantity of an item in the cart
    $(".add").on("click","button.minus",function(){//*plus
        let a=this.id.slice(5,8);
        cart[a].quantity-=1;
        cart[a].quantity=Math.max(0,cart[a].quantity);
        updatecart(cart);
    });
    
    $(".add").on("click","button.plus",function(){//*minus
        let a=this.id.slice(4,8);
        cart[a].quantity+=1;
        updatecart(cart);
        
    });

    //clear cart
    $("#clear").click(function(){
        clearcart(cart);
    });

    //remove item from cart.

    //!the jquery is not working properly in the commented part below because the event binding is not done after the cart is refreshed. so the event is not bound to the new elements
    // $("button.remove").on("click",function(){
    //     remove(this,cart);
    // });

    //*use this instead.it links the event to the document which ensures that all elements with the class remove are linked to the event
    $(document).on("click","button.remove",function(){
        remove(this,cart);
    });
});

//JAVASCRIPT FUNCTION DEFINITIONS. THEY ARE CALLED IN THE JQUERY FUNCTIONS ABOVE

// update cart.
//* if quantity is 0, delete item from cart
//* if quantity is not 0, update the quantity
function updatecart(cart){
    for(var item in cart){
        if(cart[item].quantity==0){
            delete cart[item];
            document.getElementById("r"+item).innerHTML=`<button id="${item}" class="btn cart" type="button">Add</button>`;
        }
        else{
            document.getElementById("r"+item).innerHTML=`<div><button id='minus${item}' class='btn minus'> -</button></div>
                                                         <div id='val${item}' style='text-align:center;'> ${cart[item].quantity} </div>
                                                         <div><button id='plus${item}' class='btn plus'>+ </button></div>`;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    addtocart(cart);
    // console.log(cart);
};

// add items to the cart sidebar
function addtocart(cart){
    // console.log(1);
    let str=``
    for(let item in cart){
        str+=`<div class="row">
        <div class="col-md-6">
            <div class="row cartname"><strong>`+cart[item].name+`</strong></div>
            <div class="row cartq w-100">Quantity: `+cart[item].quantity+`</div>
        </div>
        <div class="col-md-6">
            <div class="row cartprice"><strong>Rs.`+cart[item].price+`</strong></div>
            <div class="row rem"><button class="remove" id="remove${item}">remove</button></div>
        </div>
    </div>`;
    }
    
    document.getElementById("cartcontainer").innerHTML=str;
}

//clear cart by looping through cart and deleting all items
function clearcart(cart){
    for( let item in cart){
        document.getElementById("r"+item).innerHTML=`<button id="${item}" class="btn cart" type="button">Add</button>`;
    }
    localStorage.clear();
    for(let i in cart){
        delete cart[i];
    }
    updatecart(cart);

}

//* remove item from cart by making the quantity 0, then it will be deleted in updatecart
function remove(e,cart){
    let b = e.id.slice(6,);
    cart[b].quantity=0;
    // console.log(e.id);
    
    // addtocart(cart);
    updatecart(cart);
}

// document.getElementsByClassName("remove").addEventListener("click",function(){
//     console.log(1); 
    
// });