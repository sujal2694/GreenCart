let Addtocartbtns = document.querySelectorAll('.BTN');

Addtocartbtns.forEach(button => {
  button.addEventListener('click', event => {
    let ProductBox = event.target.closest('.product-box'); 
    AddTocart(ProductBox);
  })
})


let AddTocart = (ProductBox) => {
  const ProductImage = ProductBox.querySelector('img').src;
  const ProductName = ProductBox.querySelector('h2').textContent;
  const ProductPrice = ProductBox.querySelector('h3').innerHTML;
  
  let cartContent = document.querySelector('.cart-content');
  let cartBox = document.createElement('div');
  cartBox.classList.add('product');
  cartBox.innerHTML = `
              <img src="${ProductImage}">
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
})

}











