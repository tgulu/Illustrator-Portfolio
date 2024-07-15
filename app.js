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
let totalPriceElement = document.getElementById('total-price'); // Select the total price element

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
    // Clear the current product list
    listProductHTML.innerHTML = '';
    // Check if there are products to display
    if (listProducts.length > 0) {
        // Loop through each product and create a corresponding HTML element
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
    // Check if the clicked element is an "Add to Cart" button
    if (positionClick.classList.contains('add-cart')) {
        // Get the product ID from the parent element's dataset
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
});

// Function to add products to the cart
const addToCart = (product_id) => {
    // Find the index of the product in the cart array
    let postionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    // If the cart is empty, add the first product
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (postionThisProductInCart < 0) { 
        // If the product is not already in the cart, add it
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        // If the product is already in the cart, increase its quantity
        carts[postionThisProductInCart].quantity += 1;
    }
    // Update the cart display and store the updated cart in local storage
    addCartToHTML();
    addCartToMemory();
};

// Function to store cart data in local storage
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
};

// Function to update the cart display in the HTML
const addCartToHTML = () => {
    // Clear the current cart display
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    // Check if there are items in the cart
    if (carts.length > 0) {
        // Loop through each item in the cart and create a corresponding HTML element
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            // Find the product information for the cart item
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
    // Update the cart icon with the total quantity of items
    iconCartSpan.innerHTML = totalQuantity;

    // Calculate and update the total price
    cartTotal();
};

// Function to calculate the total price of the cart and update the total price element
const cartTotal = () => {
    let totalPrice = 0;
    carts.forEach(cart => {
        // Find the product information for the cart item
        let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
        let info = listProducts[positionProduct];
        // Calculate the total price for each product in the cart
        totalPrice += info.price * cart.quantity;
    });
    // Update the total price element
    totalPriceElement.innerHTML = totalPrice.toFixed(2);
};

// Event listener to handle quantity changes in the cart
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    // Check if the clicked element is a "minus" or "plus" button
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        // Get the product ID from the parent element's dataset
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        // Check if the clicked button is a "plus" button
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        // Change the quantity of the corresponding product in the cart
        changeQuantity(product_id, type);
    }
});

// Function to change the quantity of a product in the cart
const changeQuantity = (product_id, type) => {
    // Find the index of the product in the cart array
    let postionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    // Check if the product is in the cart
    if (postionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                // Increase the quantity of the product
                carts[postionItemInCart].quantity += 1;
                break;
            default:
                // Decrease the quantity of the product
                let valueChange = carts[postionItemInCart].quantity - 1;
                // If the quantity is greater than 0, update it
                if (valueChange > 0) {
                    carts[postionItemInCart].quantity = valueChange;
                } else {
                    // If the quantity is 0, remove the product from the cart
                    carts.splice(postionItemInCart, 1);
                }
                break;
        }
    }
    // Update the cart display and store the updated cart in local storage
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
