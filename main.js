//for login & sign up

const Loginbtn = document.querySelector('#btn');
const LoginPage = document.querySelector('#login-page');
const CloseBtn = document.querySelector('#closebtn');

Loginbtn.addEventListener('click', (event) => {
  LoginPage.classList.remove('activate');
})

CloseBtn.addEventListener('click', (event) => {
  LoginPage.classList.add('activate');
})

//To access the cart of yours

const Cart = document.querySelector('#cart-page');
const CartIcon = document.querySelector('.cart');
const BackBtn = document.querySelector('.backbtn');

CartIcon.addEventListener('click', (event) => {
  Cart.classList.remove('cartOpen');
})

BackBtn.addEventListener('click', (event) => {
  Cart.classList.add('cartOpen');
})

//Notifications which notify you that add items in cart

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

//for open & close slide menu

let Slide = document.querySelector('#slide-menu');
let MenuBtn = document.querySelector('.fa-bars');
let Close = document.querySelector('.close-btn');

MenuBtn.addEventListener('click', (event) => {
  Slide.style.left = '0';
})

Close.addEventListener('click', (event) => {
  Slide.style.left = '-60%';
})
    
    
    