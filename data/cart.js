export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));
/* now if the cart is empty it returns a value null..so instead of that we display thw default cart value by below */
if(!cart){ /* in this case not null will become truthy and executes below as cart will return null idf empty  by above */
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
}
}


function saveToStorage() {

    localStorage.setItem('cart', JSON.stringify(cart));/* remember JSON only stores strings..so we need to convert in to strings by using stringify */
}

export function addToCart(productId){
            let matchingItem ;
            cart.forEach((cartItem) => {
                if(productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            });
            if(matchingItem) {
                matchingItem.quantity += 1;
            }else {
                cart.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                });
            }

            saveToStorage();
        };

export  function removeFromCart(productId) {
            const newCart = [];
            cart.forEach((cartItem) => {
                if(cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            });
            cart = newCart;

            saveToStorage();
        };

export  function updateDeliveryOption(productId,deliveryOptionId){
            let matchingItem ;
            cart.forEach((cartItem) => {
                if(productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            });
            matchingItem.deliveryOptionId = deliveryOptionId;

            saveToStorage();
        }

export function loadCart(fun) { /* here fun is called as a callback----> a function to run in the future */
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load', () => {
        console.log(xhr.response);    
        fun();
    });
    
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
    
    }