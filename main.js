//for login & sign up

const LoginPageBtn = document.querySelector('#btn');
const LoginPage = document.querySelector('#login-page');
const CloseBtn = document.querySelector('#closebtn');

LoginPageBtn.addEventListener('click', (event) => {
  LoginPage.classList.remove('activate');
})

CloseBtn.addEventListener('click', (event) => {
  LoginPage.classList.add('activate');
})

let Profile = () => {
  const LoginBtn = document.querySelector('.login-btn');
  const profileBtn = document.querySelector('.profile button')
  const UserName = document.querySelector('#username');
  const PassWord = document.querySelector('#password'); 
  
  if (UserName.value.length === 0 && PassWord.value.length === 0) {
    alert('Enter username and password!')
  } else if (UserName.value.length === 0) {
    alert('Enter a username')
  } else if (PassWord.value.length === 0) {
    alert('Enter a password')
  }

} 

document.querySelector('.login-btn').addEventListener('click', (e) => {Profile();})

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


    
    
    