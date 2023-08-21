function updateOrdersOnScreen() {
    let allOrdersHTML = document.querySelector('.all-orders');
    allOrdersHTML.innerHTML = '';

    for (let order = orders.length-1; order >= 0; order--) {
        let orderHTML = document.createElement('div');
        orderHTML.classList.add('order');

        let ordersHeaderHTML = document.createElement('div');
        ordersHeaderHTML.classList.add('orders-header');
        orderHTML.appendChild(ordersHeaderHTML);

        let contentHTML = document.createElement('div');
        contentHTML.classList.add('content');
        orderHTML.appendChild(contentHTML);

        ordersHeaderHTML.innerHTML = `
            <div class="left-section-order">
                <p class="bold">Order Placed:</p>
                <p>${orders[order][0].date.month} ${orders[order][0].date.dayNumber}, ${orders[order][0].date.day}</p>
            </div>
            <div class="mid-section-order">
                <p class="bold">Total:</p>
                <p>$${orders[order][0].totalPrice}</p>
            </div>
            <div class="right-section-order">
                <p class="bold">Order ID:</p>
                <p>${orders[order][0].orderID}</p>
            </div>`;

        orders[order].forEach(item => {
            contentHTML.innerHTML += `
                <div class="item">
                    <div class="left-section-content">
                        <img class='item-image' src="../${item.image}" alt="">
                    </div>
                    <div class="mid-section-content">
                        <p class="bold itemName">${item.name}</p>
                        <p>Arriving on: ${item.arrivingDate}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <button class="buy-again" onClick="changeQuantity(this)">Buy it again</button>
                    </div>
                    <div class="right-section-content">
                        <button class="track-button" >Track package</button>
                    </div>
                </div>`;
        });

        allOrdersHTML.appendChild(orderHTML);
    }
}

function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    result = result.substring(0,5) + '-' + result.substring(6,15) + '-' + result.substring(16);

    return result;
  }

  function changeQuantity(button) {

    let item = button.parentNode;
    let quantity = 1;
    let name = item.querySelector('.itemName').textContent;
    


    
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


let items = JSON.parse(localStorage.getItem('items')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let lastDate = JSON.parse(localStorage.getItem('date'));
let totalPrice = JSON.parse(localStorage.getItem('totalPrice'));



if(items.length > 0){
    items[0].date = lastDate;
    items[0].totalPrice = totalPrice;
    items[0].orderID = generateRandomId();
    console.log("id: " + items[0].orderID);
    orders.push(items);
}
items = [];
localStorage.removeItem('items');


console.log(orders);

let cartQuantity = document.querySelector('.cart-quantity');
cartQuantity.textContent = items.reduce((sum, item) => sum + (item.quantity || 0), 0);



updateOrdersOnScreen();



console.log(orders[0]);
localStorage.setItem('orders', JSON.stringify(orders));
localStorage.setItem('items', JSON.stringify(items));



