let Addtocartbtns = document.querySelectorAll('.BTN');

Addtocartbtns.forEach(button => {
  button.addEventListener('click', event => {
    let ProductBox = event.target.closest('.product-box'); 
    AddTocart(ProductBox);
    updatePrice();
  })
})


let AddTocart = (ProductBox) => {
  
  const ProductImage = ProductBox.querySelector('img').src;
  const ProductName = ProductBox.querySelector('h2').textContent;
  const ProductPrice = ProductBox.querySelector('h3').innerHTML;
  
  let cartContent = document.querySelector('.cart-content');
  let Cartitem = cartContent.querySelectorAll('#name');
  for (let item of Cartitem) {
    if (item.textContent === ProductName) {
      alert('This item is already in cart');
      return;
    }
  }
  let cartBox = document.createElement('div');
  cartBox.classList.add('product');
  cartBox.innerHTML = `
              <img src="₹{ProductImage}">
            <div class="product-details">
              <span id="category">vegetables</span>
              <h1 id="name">${ProductName}</h1>
              <h2 id="price">${ProductPrice}</h2>
              <div class="quantity">
                <button class="Btn" id="minus"><i class="fa fa-minus"></i></button>
                <span id="number">1</span>
                <button class="Btn" id="plus"><i class="fa fa-plus"></i></button>
              </div>
            </div>
            <i class="fa fa-trash removebtn"></i>
  `
  cartContent.appendChild(cartBox)
  
cartBox.querySelector('.removebtn').addEventListener('click', () => {
    cartBox.remove();
    updatePrice();
})

cartBox.querySelector('.quantity').addEventListener('click', (event) => {
  let numberElement = cartBox.querySelector('#number');
  let Decrementbtn = cartBox.querySelector('#minus');
  let Quantity = numberElement.textContent;
  
  if (event.target.id === 'minus' && Quantity>1) {
    Quantity--;
    if (Quantity === '1') {
      Decrementbtn.style.color = '#999';
    }
  }else if (event.target.id === 'plus') {
    Quantity++;
  }
  numberElement.textContent = Quantity;
  updatePrice();
})



}

let updatePrice = () => {
  let CartContent = document.querySelector('.cart-content'); 
  let totalprice = document.querySelector('#total-price');
  let Boxes = CartContent.querySelectorAll('.product');
  let total = 0;
  Boxes.forEach(Box => {
    let priceElement  = Box.querySelector('#price');
    let quantityElement = Box.querySelector('#number');
    let price = priceElement.textContent.replace('₹', '');
    let quantity = quantityElement.textContent;
    total += price * quantity;
  })
  totalprice.textContent = `₹${total}`;
}


let Buybtn = document.querySelector('.Buybtn');
Buybtn.addEventListener('click', (e) => {
  let CartContent = document.querySelector('.cart-content'); 
  let CartBoxes = CartContent.querySelectorAll('.product');
  if (CartBoxes.length === 0) {
    alert('Your cart is empty. Please add something in your cart');
    return;
  }
  
  CartBoxes.forEach(cartBox=>cartBox.remove());
  updatePrice();
  alert('Thanks for purchase!')
})








