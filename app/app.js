var cartCount = 0;
var productInfo = {};
function changeRoute() {
let hashTag = window.location.hash;
 let pageID = hashTag.replace("#", "");
 
 
 if (pageID != "" && pageID != "home") {
    $.get(`pages/${pageID}.html`, function (data) {
 console.log("data " + data);
  $("#app").html(data);
  loadCart();
});

} else {
    $.get(`pages/home.html`, function (data) {
    console.log("data " + data);
     $("#app").html(data);
     loadCoffee();
    });
}
}

function loadCart() {
    $(".cart").html("");
    $.each(productInfo.Cart, (idx, cartItem) => {
        let coffee = productInfo.Products[cartItem.itemIdx];

        $(".cart").append(`<div class="coffee">
        <div class="coffeeImage">
            <img src="images/${coffee.productImage}" alt="coffee one" >
        </div>
        <div class="coffeeDetails">
            <h3>${coffee.productName}</h3>
            <p>${coffee.productShortDesc}</p>
            <p class="price">${coffee.productPrice}</p>
            <div id="${idx}" class="buyNow">Delete</div>
        </div>
    </div>`);
    });
}

/*function loadCoffee() {
    $(".home").html("");
    
        $.each(productInfo.Products, (idx, coffee) =>[
            $(".home").append(`<div class="coffee">
            <div class="coffeeImage">
                <img src="images/${coffee.productImage}" alt="coffee one" >
            </div>
            <div class="coffeeDetails">
                <h3>${coffee.productName}</h3>
                <img src="images/${coffee.productShortDesc}" alt="coffee one" >
               
                <p class="price">${coffee.productPrice}</p>
                <div id="${idx}" class="buyNow">Buy Now</div>
            </div>
        </div>`),
        ]);

    $(".buyNow").on("click", (e) => {
        console.log("click");
        let productIdx = e.currentTarget.id;
        let obj = {
            itemIdx: productIdx,
        };
        productInfo.Cart.push(obj);
        console.log(productInfo.Cart);
        cartCount = productInfo.Cart.length;
        updateCartCount();
    });

} */
function loadCoffee() {
    $(".home").html("");

    $.each(productInfo.Products, (idx, coffee) => {
        $(".home").append(`<div class="coffee">
            <div class="coffeeImage">
                <img src="images/${coffee.productImage}" alt="coffee one">
            </div>
            <div class="coffeeDetails">
                <h3>${coffee.productName}</h3>
                <img src="images/${coffee.productShortDesc}" alt="coffee one">
                <p class="price">${coffee.productPrice}</p>
                <div id="${idx}" class="buyNow">Buy Now</div>
            </div>
        </div>`);
    });

    $(".buyNow").on("click", (e) => {
        console.log("click");
        let productIdx = e.currentTarget.id;
        let obj = {
            itemIdx: productIdx,
        };
        productInfo.Cart.push(obj);
        console.log(productInfo.Cart);
        cartCount = productInfo.Cart.length;
        updateCartCount();

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item added to cart",
            showConfirmButton: false,
            timer: 1700
        });
    });
}

function updateCartCount(){
    if(cartCount == 0) {
        $(".cartCounter").css("display", "none");
    } else if (cartCount >= 1) {
        $(".cartCounter").css("display", "block");
        $(".cartCounter").html(cartCount);
        
    }
}

function getData() {
    $.get(`data/data.json`, (data) => {
productInfo = data;
      }).fail(function(error){
            alert("error ", error);
      
})
}

     function initURLListener() {
        $(window).on('hashchange', changeRoute);
        changeRoute();

        updateCartCount();

        getData();
    }
        
        $(document).ready(function () {
            initURLListener();
        });
