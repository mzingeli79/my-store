if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){

    var removeCartItem = document.getElementsByClassName('remove-btn');

    for(var i = 0; i<removeCartItem.length; i++){
            var button = removeCartItem[i];
            button.addEventListener('click', removeCartItems);
    }

    var quantityInput = document.getElementsByClassName('i-quantity');
    for(var i = 0; i<quantityInput.length; i++){
        var input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('add-to-cart');
    for(var i = 0; i<addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartButton);
    }

    document.getElementsByClassName('purchase')[0].addEventListener('click', purchaseClicked);

    var modalBtn = document.querySelector('.modal-btn');
    var bod = document.querySelector('.modal-bg');
    var close = document.querySelector('.close');
    
        modalBtn.addEventListener('click', function(){
            bod.style.visibility="visible";
        });
        close.addEventListener('click', function(){
            bod.style.visibility="hidden";
        });

}

function purchaseClicked (){
    alert('Thank You for your Purchase');
    var cartItems = document.getElementsByClassName('cart-container')[0];
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItems(event){
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
}

function quantityChanged(event){
        var input = event.target;
        if(isNaN(input.value) || input.value <= 0){
            input.value = 1;
        }
        updateCartTotal();
}

function addToCartButton(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('description')[0].innerText; 
    var price = shopItem.getElementsByClassName('s-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('sitem-pic')[0].src;
    console.log(title, price, imageSrc);
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('div');
    cartRow.innerText = title;
    var cartItems = document.getElementsByClassName('cart-container')[0];
    var cartItemNames = document.getElementsByClassName('cart-item-name');
    for(var i = 0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('Already in cart');
            return;
        }
    }
    var cartRowContent = `<div class="cart-row">
    <div class="title">
        <a href=""></a><img src="${imageSrc}" class="item-pic"></a>
        <h2 class="cart-item-name">${title}</h2>
    </div>
    <div class="price">
        <p class="i-price">${price}</p>
    </div>
    <div class="q-remove">
        <input type="number" class="i-quantity" value="1">
        <input type="button" class="remove-btn" value="X">
    </div>     
</div>`
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeCartItems);
    cartRow.getElementsByClassName('i-quantity')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {  

    var cartContainer = document.getElementsByClassName('cart-container')[0];
    var cartRows = cartContainer.getElementsByClassName('cart-row');
    var total = 0;

    for(var i = 0; i< cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('i-price')[0];
        var quantityElement = cartRow.getElementsByClassName('i-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('R', ''));
        var quantity = parseFloat(quantityElement.value);
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total')[0].innerText = 'Total: R' + total;
}


