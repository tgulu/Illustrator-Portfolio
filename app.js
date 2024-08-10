// *** Hamburger Menu ***

// Selecting the hamburger menu icon and navigation menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav");

// Event listener to toggle the active class on hamburger menu and navigation menu
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle('active');
});

// Event listener to close the menu when a navigation link is clicked
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// // *** Change Web page ***

// // Redirecting to 'sport.html' when the element with id 'sports' is clicked
// const sport = document.getElementById('sports');
// sport.addEventListener('click', function () {
//     window.location.href = 'sport.html';
// });

// // Redirecting to 'merchandise.html' when the element with id 'merchandise' is clicked
// const merchandise = document.getElementById('merchandise');
// merchandise.addEventListener('click', function () {
//     window.location.href = 'merchandise.html';
// });

// // Redirecting to 'graphic.html' when the element with id 'graphic' is clicked
// const graphic = document.getElementById('graphic');
// graphic.addEventListener('click', function () {
//     window.location.href = 'graphic.html';
// });

document.querySelectorAll('.image-container .image img').forEach(image => {
    image.onclick = () => {
        const popup = document.querySelector('.popup');
        const popupImage = document.querySelector('.popup img');

        popup.style.display = 'block';
        popupImage.src = image.getAttribute('src');
    };
});

document.querySelector('.popup span').onclick = () => {
    document.querySelector('.popup').style.display = 'none';
};




