// *** Hamburger Menu ***

// Selecting the hamburger menu icon and navigation menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav");

// Event listener to toggle the active class on hamburger menu and navigation menu
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open'); // Toggle the menu-open class on the body element
});

// Event listener to close the menu when a navigation link is clicked
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.classList.remove('menu-open'); // Remove the menu-open class from the body
}));


// *** Change Web page ***

// Redirecting to 'sport.html' when the element with id 'sports' is clicked
const sport = document.getElementById('sports');
sport.addEventListener('click', function () {
    window.location.href = 'sport.html';
});

// Redirecting to 'merchandise.html' when the element with id 'merchandise' is clicked
const merchandise = document.getElementById('merchandise');
merchandise.addEventListener('click', function () {
    window.location.href = 'merchandise.html';
});

// Redirecting to 'graphic.html' when the element with id 'graphic' is clicked
const graphic = document.getElementById('graphic');
graphic.addEventListener('click', function () {
    window.location.href = 'graphic.html';
});




