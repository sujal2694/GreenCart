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
  Cart.style.left = '0';
})

BackBtn.addEventListener('click', (event) => {
  Cart.style.left = '-750px';
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
    
    
    