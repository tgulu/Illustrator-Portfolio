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


let iconCart = document.querySelector('.icon-cart');
let body = document.querySelector('section');
let closeCart = document.querySelector('.close');
let listProductHTML = document.querySelector('.list-product');
let listCartHTML = document.querySelector('.list-cart');

let listProducts = [];
let carts = [];
    
iconCart.addEventListener('click', () => {
    body.classList.toggle('show-cart')
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('show-cart')
})

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product =>{
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
            listProductHTML.appendChild(newProduct)
        })
    }
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('add-cart')){
        let product_id = positionClick.parentElement.dataset.id;
        alert(product_id);
        addToCart(product_id)
    }
})

const addToCart = (product_id) =>{

}

const initApp = () => {
    fetch('/product.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        console.log(listProducts)
        addDataToHTML()
        
    })

}
initApp();
    