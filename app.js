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



const sport = document.getElementById('sports');
sport.addEventListener('click', function () {
    window.location.href = 'sport.html';
})

const merchandise = document.getElementById('merchandise');
merchandise.addEventListener('click', function () {
    window.location.href = 'merchandise.html';
})

const graphic = document.getElementById('graphic');
graphic.addEventListener('click', function () {
    window.location.href = 'graphic.html';
})


// const shop = document.getElementById('shop');
// shop.addEventListener('click', function () {
//     window.location.href = 'shop.html';
// })

// const home = document.getElementById('home');
// shop.addEventListener('click', function () {
//     window.location.href = 'index.html';
// })


// const artwork = document.getElementById('artwork');
// artwork.addEventListener('click', function () {
//     window.location.href = 'artwork.html';
// })

// const contact = document.getElementById('contact');
// contact.addEventListener('click', function () {
//     window.location.href = 'contact.html';
// })

// const publishing = document.getElementById('publishing');
// publishing.addEventListener('click', function () {
//     window.location.href = 'publishing.html';
// })

// const going = document.getElementById('going');
// going.addEventListener('click', function () {
//     window.location.href = 'project.html';
// })


document.querySelectorAll('.image-container img').forEach(image => {
    image.onclick = () => {
        document.querySelector('.popup').style.display = 'block';
        document.querySelector('.popup img').src = image.getAttribute('src');
    }

});

document.querySelector('.popup span').onclick = () => {
    document.querySelector('.popup').style.display = 'none';
}