const Loginbtn = document.querySelector('#btn');
const LoginPage = document.querySelector('#login-page');
const CloseBtn = document.querySelector('#closebtn');

Loginbtn.addEventListener('click', (event) => {
  LoginPage.classList.remove('activate');
})

CloseBtn.addEventListener('click', (event) => {
  LoginPage.classList.add('activate');
})

const Cart = document.querySelector('#cart-page');
const CartIcon = document.querySelector('.cart');
const BackBtn = document.querySelector('.backbtn');

CartIcon.addEventListener('click', (event) => {
  Cart.classList.remove('cartOpen');
})

BackBtn.addEventListener('click', (event) => {
  Cart.classList.add('cartOpen');
})


let Notification = document.querySelector('.addtocart');
let Btn = document.querySelectorAll('.BTN');

let notify = async () => {
  Notification.style.top = '-150px';
}

Btn.forEach(button => {
  button.addEventListener('click', () => {
    Notification.style.top = '6%';
    setTimeout(notify, 3000);
  })
})


    
    
    