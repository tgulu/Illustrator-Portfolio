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



// Shop Cart Code

let iconCart = document.querySelector('.icon-cart');
let body = document.querySelector('section');
let closeCart = document.querySelector('.close');
let listProductHTML = document.querySelector('.list-product');
let listCartHTML = document.querySelector('.list-cart');
let iconCartSpan = document.querySelector('.icon-cart span');

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
            listProductHTML.appendChild(newProduct)
        })
    }
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('add-cart')) {
        let product_id = positionClick.parentElement.dataset.id;
        // alert(product_id);
        addToCart(product_id)
    }
})

const addToCart = (product_id) => {
    let postionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (postionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[postionThisProductInCart].quantity = carts[postionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `

            <div class="image">
                <img src="${info.image}" alt="${info.alt}>
            </div>
            <div class="name">
                ${info.name} 
            </div>
            <div class="total-price">
                 ${info.price * cart.quantity}  
            </div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${cart.quantity}</span>
                <span class="plus">></span>
            </div>
            `;
            listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerHTML = totalQuantity
}


listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus'
        }
        changeQuantity( product_id, type);
    }
})

const changeQuantity = ( product_id, type) => {
    let postionItemInCart = carts.findIndex((value) => value.product_id == product_id)
    if(postionItemInCart >= 0){
        switch (type) {
            case 'plus':
                carts[postionItemInCart].quantity = carts[postionItemInCart].quantity + 1;
                break;
        
            default:
                let valueChange = carts[postionItemInCart].quantity - 1;
                if( valueChange > 0){
                    carts[postionItemInCart].quantity = valueChange;
                } else{
                    carts.splice(postionItemInCart,1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}


const initApp = () => {
    fetch('/product.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            console.log(listProducts)
            addDataToHTML()

            //get cart from memory
            if(localStorage.getItem('cart')){
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }

        })

}
initApp();
