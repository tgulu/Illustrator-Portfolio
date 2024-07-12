// *** Hamburger Menu ***
// Selecting the hamburger menu icon and navigation menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

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



// ***Shop Cart***

// Selecting elements from the DOM
let iconCart = document.querySelector('.icon-cart');
let body = document.querySelector('section');
let closeCart = document.querySelector('.close');
let listProductHTML = document.querySelector('.list-product');
let listCartHTML = document.querySelector('.list-cart');
let iconCartSpan = document.querySelector('.icon-cart span');

// Initialising arrays for products and carts
let listProducts = [];
let carts = [];

// Event listener to toggle cart visibility when cart icon is clicked
iconCart.addEventListener('click', () => {
    body.classList.toggle('show-cart');
});

// Event listener to toggle cart visibility when close icon is clicked
closeCart.addEventListener('click', () => {
    body.classList.toggle('show-cart');
});

// Function to add product data to the HTML
const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <img src="${product.image}" alt="${product.alt}">
            <h2>${product.name}</h2>
            <div class="price">£${product.price}</div>
            <button class="add-cart"> 
                Add to Cart
            </button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
};

// Event listener to handle adding products to cart
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('add-cart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
});

// Function to add products to the cart
const addToCart = (product_id) => {
    let postionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (postionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[postionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
};

// Function to store cart data in local storage
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
};

// Function to update the cart display in the HTML
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
            <div class="image">
                <img src="${info.image}" alt="${info.alt}">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="total-price">
                 £${info.price * cart.quantity}
            </div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${cart.quantity}</span>
                <span class="plus">></span>
            </div>
            `;
            listCartHTML.appendChild(newCart);
        });
    }
    iconCartSpan.innerHTML = totalQuantity;
};

// Event listener to handle quantity changes in the cart
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
});

// Function to change the quantity of a product in the cart
const changeQuantity = (product_id, type) => {
    let postionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (postionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[postionItemInCart].quantity += 1;
                break;
            default:
                let valueChange = carts[postionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[postionItemInCart].quantity = valueChange;
                } else {
                    carts.splice(postionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
};

// Initialisation function to fetch product data and load cart from memory
const initApp = () => {
    fetch('/product.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            console.log(listProducts);
            addDataToHTML();

            // Get cart from memory if it exists
            if (localStorage.getItem('cart')) {
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        });
};

// Call the initialisation function to set up the app
initApp();
