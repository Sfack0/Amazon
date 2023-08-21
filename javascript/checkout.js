

function updateCheckoutTitle(){
  let midSection = document.querySelector('.mid-section')
  midSection.innerHTML = `<p class="checkout">Checkout (<span class="items-count">${totalQuantity} items</span>)</p>`;
}


function initItemsInScreen(){

  let productSection = document.querySelector('.items-div');

  productSection.innerHTML = '';
  items.forEach((item) => {
  
    productSection.innerHTML += `<div class="item">
        <div class="date">
            Delivery date: ${lastDate.day} ${lastDate.month} ${lastDate.dayNumber}
        </div>
        <div class="item-info">
            <div class="image-info-div">
                <img src="../${item.image}" alt="">
            
                <div class="title-price-quantity-div">
                    <div class="title">
                        ${item.name}
                    </div>
                    <div class="price">
                        $${(item.priceCents / 100).toFixed(2)}
                    </div>
                    <div class="quantity-and-buttons-div">
                        <div class="quantity">
                            Quantity: ${item.quantity}
                        </div>
                        <button>Update</button>
                        <button onClick='deleteItem("${item.id}")'>Delete</button>
                    </div>
                </div>
            </div>
            <div class="delivery-options-div">
                <div class="delivery-option-text">
                    <p> Choose a delivery option: </p>
                </div>
                <div class="delivery-option"  onClick='shippingButtonClicked("${item.id}", 0)'>
                    <input type="radio" name='delivery-of-${item.id}' value='0' ${isRadioButtonChecked(item.id, 0)}>
                    <div>
                        <div class="delivery-option-date">
                            ${daysLater(10)}
                        </div>
                        <div class="delivery-option-price">
                            <p> FREE Shipping </p>
                        </div>
                    </div>
                </div>
                <div class="delivery-option" onClick='shippingButtonClicked("${item.id}", 4.99)'>
                    <input type="radio" name='delivery-of-${item.id}' value='4.99' ${isRadioButtonChecked(item.id, 4.99)}>
                    <div>
                        <div class="delivery-option-date">
                            ${daysLater(6)}
                        </div>
                        <div class="delivery-option-price">
                            <p> $4.99 - Shipping </p>
                        </div>
                    </div>
                </div>
                <div class="delivery-option" onClick='shippingButtonClicked("${item.id}", 9.99)'>
                    <input type="radio" name='delivery-of-${item.id}' value='9.99' ${isRadioButtonChecked(item.id, 9.99)}>
                    <div>
                        <div class="delivery-option-date">
                            ${daysLater(3)}
                        </div>
                        <div class="delivery-option-price">
                            <p>  $9.99 - Shipping </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
  });

  calculateShippingPrices();

}

function initSummaryOnScreen(){

  let summarySection = document.querySelector('.order-summary-div');

      summarySection.innerHTML = `<div class="order-summary-title">
                    Order Summary
                </div>
                <div class="summary-price-div">
                    <div class="text">
                        Items (${totalQuantity}):
                    </div>
                    <div class="price-text">
                        $${price}
                    </div>
                    
                </div>

                <div class="summary-price-div">
                    <div class="text">
                        Shipping & handling:
                    </div>
                    <div class="price-text shipping">
                        $${totalShippingPrice}
                    </div>
                </div>

                <div class="summary-price-div">
                    <div class="text">
                        Total before tax:
                    </div>
                    <div class="price-text">
                        $${ beforeTax = ((price*100 + totalShippingPrice*100)/100).toFixed(2)}
                    </div>
                </div>


                <div class="summary-price-div estimated">
                    <div class="text">
                        Estimated tax (10%):
                    </div>
                    <div class="price-text">
                        $${ tax = (beforeTax / 10).toFixed(2)}
                    </div>
                </div>

                <div class="summary-price-div total">
                    <div class="text">
                        Order total:
                    </div>
                    <div class="price-text">
                        $${totalPrice = (Number(beforeTax) + Number(tax)).toFixed(2)}
                    </div>
                </div>

                <button class="order-button" onClick="window.location.href = '../html/orders.html';">
                    Place your order
                </button>`;
  
}

function calculateShippingPrices(){
  totalShippingPrice = 0;
  items.forEach((item)=>{
      totalShippingPrice += item.shippingPrice;
  });
  initSummaryOnScreen();

  localStorage.setItem('totalPrice', JSON.stringify(totalPrice));

}

function deleteItem(id){
   items = items.filter((item) => item.id !== id);
   localStorage.setItem('items', JSON.stringify(items));

   let priceCents = items.reduce((total, item) => {
    return total + item.priceCents * item.quantity;
  }, 0);
  
   price = (priceCents / 100).toFixed(2);  
   totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

   initItemsInScreen();
   initSummaryOnScreen();
   updateCheckoutTitle();
}

function shippingButtonClicked(itemID, price){

  let item = items.find((item) => item.id === itemID);

  if (item) {
    if(price == 0)
        item.arrivingDate = daysLater(10);
    else if(price == 4.99)
        item.arrivingDate = daysLater(6);
    else{
        item.arrivingDate = daysLater(3);
    }
    localStorage.setItem('items', JSON.stringify(items));
    console.log("arriving: " + item.arrivingDate);

    item.shippingPrice = price;
    checkedRadioButtons[itemID] = price;
    initItemsInScreen();
  }
}

function isRadioButtonChecked(itemID, value) {


  
  if(checkedRadioButtons[itemID] != 0 && checkedRadioButtons[itemID] != 4.99 && checkedRadioButtons[itemID] != 9.99 && value == 0)
      return 'checked';


  return checkedRadioButtons[itemID] === value ? 'checked' : '';
}

function daysLater(daysLater) {
    let newDate = new Date()
    newDate.setDate(date.getDate() + daysLater);
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const dayNumber = newDate.getDay();

    return `${dayNames[dayNumber]}, ${monthNames[month]} ${day}`;
  }




let items = JSON.parse(localStorage.getItem('items')) || [];

items.forEach((item, index) => {
    console.log("?????");

    if (item.quantity === undefined) {
        console.log(items);
        
        items.splice(index, 1);          //if product has quantity undefined, remove it
        console.log(items);

    }
});

let date = new Date();
let day = date.getDay();
let month = date.getMonth();
let dayNumber = date.getDate();
let hour = date.getHours();
let minutes = date.getMinutes();
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];

  let lastDate = {};
  lastDate.day = dayNames[day];
  lastDate.month = monthNames[month];
  lastDate.dayNumber = dayNumber;
  lastDate.hour = hour;
  lastDate.minutes = minutes;

  localStorage.setItem('date', JSON.stringify(lastDate));




localStorage.setItem('items', JSON.stringify(items));



items.forEach((item) =>{
    item.shippingPrice = 0;
    item.arrivingDate = daysLater(10);
    console.log("arriving: " + item.arrivingDate);
});

let totalShippingPrice = 0;
let checkedRadioButtons = {};

let priceCents = items.reduce((total, item) => {
  return total + item.priceCents * item.quantity;
}, 0);

let price = (priceCents / 100).toFixed(2);


totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);


shippingPrice = 0;






  


let totalPrice = 0;


initItemsInScreen();
initSummaryOnScreen();
updateCheckoutTitle();

