// window.addEventListener('scroll', () => {
//     const navbar = document.querySelector('header');
//     navbar.classList.toggle('sticky', window.scrollY > 0);
// });

const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle('active');
})

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))



const shop = document.getElementById('shop');
shop.addEventListener('click', function () {
    window.location.href = 'shop.html';
})

// const home = document.getElementById('home');
// shop.addEventListener('click', function () {
//     window.location.href = 'index.html';
// })


const artwork = document.getElementById('artwork');
artwork.addEventListener('click', function () {
    window.location.href = 'artwork.html';
})

const contact = document.getElementById('contact');
contact.addEventListener('click', function () {
    window.location.href = 'contact.html';
})

