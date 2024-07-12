// Selecting elements from the DOM
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// Configuration parameters
let countItem = items.length;
let itemActive = 0;

// Event listener for the 'next' button click
next.onclick = function () {
    itemActive = itemActive + 1;
    // Reset to the first item if we go beyond the last item
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showSlider();
};

// Event listener for the 'prev' button click
prev.onclick = function () {
    itemActive = itemActive - 1;
    // Go to the last item if we go before the first item
    if (itemActive < 0) {
        itemActive = countItem - 1;
    }
    showSlider();
};

// Auto run slider with an interval
let refreshInterval = setInterval(() => {
    next.click();
}, 9000);

// Function to display the active slider item
function showSlider() {
    // Remove 'active' class from the old active items
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // Add 'active' class to the new active items
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // Clear and reset the auto-run interval
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 6000);
}

// Event listener for thumbnail clicks
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    });
});
