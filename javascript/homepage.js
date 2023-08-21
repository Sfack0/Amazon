


function changeQuantity(button) {

    let item = button.parentNode;
    let quantity = item.querySelector('select').value;
    let name = item.querySelector('.product-name').textContent;
    
    name = name.slice(0, (name.length / 2) - 5);  //remove the tooltip




    
    if(!items.includes( products.find(obj => obj.name === name)))
        items.push( products.find(obj => obj.name === name));
    

    let index = items.findIndex(item => item.name === name);


    items[index].quantity = items[index].quantity || 0;  //if quantity doesn't exist, initialize with 0
    items[index].quantity += Number(quantity);


    cartQuantity.textContent = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

    if (Number(cartQuantity.textContent) >= 1000) {
        cartQuantity.style.left = '26px';
        cartQuantity.style.fontSize = '11px';
    } else if (Number(cartQuantity.textContent) >= 100) {
        cartQuantity.style.left = '27px';
        cartQuantity.style.fontSize = '14px';
    } else if (Number(cartQuantity.textContent) >= 10) {
        cartQuantity.style.left = '31px';
    }


    localStorage.setItem('items', JSON.stringify(items));
}





//localStorage.clear();
const items = JSON.parse(localStorage.getItem('items')) || [];


let cartQuantity = document.querySelector('.cart-quantity');
cartQuantity.textContent = items.reduce((sum, item) => sum + (item.quantity || 0), 0);


if (Number(cartQuantity.textContent) >= 1000) {
    cartQuantity.style.left = '26px';
    cartQuantity.style.fontSize = '11px';
} else if (Number(cartQuantity.textContent) >= 100) {
    cartQuantity.style.left = '27px';
    cartQuantity.style.fontSize = '14px';
} else if (Number(cartQuantity.textContent) >= 10) {
    cartQuantity.style.left = '31px';
}

products.forEach((product) => {

    let productSection = document.querySelector('.products-section');

    productSection.innerHTML += `<div class="box">
    <img src="../${product.image}" alt="" class="product-image" >
    <p class="product-name">${product.name}
    <span class="tooltip">${product.name}</span>
    </p>
    <div class="rating">
        <img src="../images/ratings/rating-${Number(product.rating.stars * 10)}.png" alt="stars" class="stars">
        <p class="amount-of-raters">${product.rating.count}</p>
    </div>

    <p class="price">$${(product.priceCents / 100).toFixed(2)}</p>

    <div class="product-quantity-dropdown">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
    </div>

    <button class="add-to-cart-button" onClick="changeQuantity(this)">Add to Cart</button>

</div>`


});




