// ------------------------------Le panier---------------------------------
//La clé utilisée pour identifier le localStorage
const storageKey = "cart";


export function saveCart(cart) {
    window.localStorage.setItem(storageKey, JSON.stringify(cart));
};

export function getCart() {
    let cart = window.localStorage.getItem(storageKey);
    //Si le panier est vide
    if (cart == null) {
        return [];
    }
    //Si le panier existe déjà
    else {
        return JSON.parse(cart);
    }
};

export function addToCart(item) {
    if ((item.quantity > 0) && (item.colors != null)) {
        let cart = getCart();
        let addedItem = cart.find(it => (it.id == item.id) && (it.colors == item.colors));
        console.log("cart", cart);
        if (addedItem != undefined) {
            addedItem.quantity++;
        } else {
            cart.push(item);
        };
        saveCart(cart);
    } else {
        alert("L'un des champs n'est pas correctement renseigné");
    }
};

//Fonction de suppression d'un item du panier - ne fonctionne pas !
/*export function removeFromCart(item) {
    let cart = getCart();
    let spottedItem = cart.find(it => ((it.id == item.id) && (it.colors == item.colors)));
    console.log(spottedItem);
    window.localStorage.removeItem("spottedItem");
    saveCart(cart);
};*/

//Cette fonction permet de sauvegarder tous les items ayant un id et une couleur différente de celui que l'on veut supprimer
export function removeFromCart(item) {
    let cart = getCart();
    cart = cart.filter(it => ((it.id != item.id) || ((it.id == item.id) && (it.colors != item.colors))));
    saveCart(cart);
};


//Fonction de changement de la quantité d'un item dans le panier
export function changeQuantity(item) {
    let cart = getCart();
    let spottedItem = cart.find(it => ((it.id == item.id) && (it.colors == item.colors)));
    spottedItem.quantity = item.quantity;
    saveCart(cart);
};

async function showCart(item) {
    let cart = getCart();
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const itemId = item.id;
        const result = await fetch(`http://localhost:3000/api/products/${itemId}`);
        const it = await result.json();
        const cartContent = document.getElementById("cart__items");
        const cartItem = document.createElement("article");
        cartItem.classList.add("cart__item");
        cartItem.dataset.id = item.id;
        cartItem.dataset.color = item.colors;

        cartContent.appendChild(cartItem);

        const itemImg = document.createElement("div");
        itemImg.classList.add("cart__item__img");

        const imageElement = document.createElement("img");
        imageElement.src = it.imageUrl
        imageElement.alt = it.altTxt;

        cartItem.appendChild(itemImg);
        itemImg.appendChild(imageElement);

        const itemContent = document.createElement("div");
        itemContent.classList.add("cart__item__content");

        cartItem.appendChild(itemContent);

        const itemDescription = document.createElement("div");
        itemDescription.classList.add("cart__item__content__description");

        itemContent.appendChild(itemDescription);

        const itemName = document.createElement("h2");
        itemName.innerText = it.name;
        const itemColor = document.createElement("p");
        itemColor.innerText = item.colors;
        const itemPrice = document.createElement("p");
        itemPrice.classList.add("itemPrice");
        itemPrice.innerText = `${it.price.toFixed(2)} €`;

        itemDescription.appendChild(itemName);
        itemDescription.appendChild(itemColor);
        itemDescription.appendChild(itemPrice);

        const itemContentSettings = document.createElement("div");
        itemContentSettings.classList.add("cart__item__content__settings");

        itemContent.appendChild(itemContentSettings);

        const contentQuantity = document.createElement("div");
        contentQuantity.classList.add("cart__item__content__settings__quantity");

        itemContentSettings.appendChild(contentQuantity);

        const quantity = document.createElement("p");
        quantity.innerText = `Qté :`;
        const itemQuantity = document.createElement("input");
        itemQuantity.type = "number";
        itemQuantity.classList.add("itemQuantity");
        itemQuantity.min = "1";
        itemQuantity.max = "100";
        itemQuantity.value = item.quantity;

        contentQuantity.appendChild(quantity);
        contentQuantity.appendChild(itemQuantity);

        //Intégration de l'eventListener pour gérer la quantité
        itemQuantity.closest(".cart__item").addEventListener("change", function (event) {
            item.quantity = event.target.value;
            changeQuantity(item);
            getTotalQty();
            getCartPrice();
        });

        const contentDelete = document.createElement("div");
        contentDelete.classList.add("cart__item__content__settings__delete");

        itemContentSettings.appendChild(contentDelete);

        const deleteItem = document.createElement("p");
        deleteItem.classList.add("deleteItem");
        deleteItem.innerText = "Supprimer";
        document.querySelector(".delete");

        contentDelete.appendChild(deleteItem);

        deleteItem.closest(".cart__item__content__settings__delete").addEventListener("click", function () {
            removeFromCart(item);
            cartItem.remove();
            getCartPrice();
        });

        const totalQty = document.getElementById("totalQuantity");
        totalQty.innerText = getTotalQty();

        function getCartPrice() {
            let quantities = cart.map(item => parseInt(item.quantity));
            let cartPrice = 0;
            let price = it.price;
            for (let i = 0; i < quantities.length; i++) {
                cartPrice += quantities[i] * price;
            };
            return cartPrice;
        };

        const totalPrice = document.getElementById("totalPrice");
        totalPrice.innerText = getCartPrice();
    }
};
showCart();

function getTotalQty() {
    let cart = getCart();
    let quantities = cart.map(item => parseInt(item.quantity));
    let totalQuantity = 0;
    for (let i = 0; i < quantities.length; i++) {
        totalQuantity += quantities[i];
    };
    return totalQuantity;
};

// function getCartPrice() {
//     let cart = getCart();
//     let quantities = cart.map(item => parseInt(item.quantity));
//     let cartPrice = 0;
//     for (let i = 0; i < quantities.length; i++) {
//         cartPrice += quantities[i] * (document.querySelector(".itemPrice").value);
//         console.log(document.querySelector(".itemPrice").value);
//     };
//     return cartPrice;
// };
// getCartPrice();

//-------------------------------Formulaire--------------------------
//Ajouter des attributs placeholder

//Vérification du prénom
document.getElementById("firstName").placeholder = "Perrine";

const namesRegex = /^[A-Za-z\-\s*]+$/;

function checkFirstName() {
    const firstName = document.getElementById("firstName").value;
    if (namesRegex.test(firstName)) {
        return;
    } else {
        const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerText = "Le prénom renseigné n'est pas valide !";
    }
};

document.getElementById("firstName").addEventListener("change", function (event) {
    //event.preventDefault();
    checkFirstName();
    contact.firstName = event.target.value;
});

//Vérification du nom
document.getElementById("lastName").placeholder = "Duval";

function checkLastName() {
    const lastName = document.getElementById("lastName").value;
    if (namesRegex.test(lastName)) {
        return;
    } else {
        const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        lastNameErrorMsg.innerText = "Le nom renseigné n'est pas valide !";
    }
};

document.getElementById("lastName").addEventListener("change", function (event) {
    //event.preventDefault();
    checkLastName();
    contact.lastName = event.target.value;
});

//Vérification de l'adresse
document.getElementById("address").placeholder = "3 passage des prés";

function checkAddress() {
    const address = document.getElementById("address").value;
    const addressRegex = /(^[0-9\,]{1,3})\s*([A-Za-z\-\,\s*]+)$/;
    if (addressRegex.test(address)) {
        return;
    } else {
        const addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.innerText = `L'adresse renseignée n'est pas valide`;
    }
};

document.getElementById("address").addEventListener("change", function (event) {
    //event.preventDefault();
    checkAddress();
    contact.address = event.target.value;
});

//Vérification de la ville
document.getElementById("city").placeholder = "35000 Rennes";
//On pourrait utiliser le .replace pour enregistrer l'info comme on la veut https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp

function checkCity() {
    const city = document.getElementById("city").value;
    const cityRegex = /(^[A-Za-z-\s*]+)\s*([0-9]{5})$/;
    if (cityRegex.test(city)) {
        return;
    } else {
        const cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.innerText = "La ville indiquée n'est pas valide !";
    }
};

document.getElementById("city").addEventListener("change", function (event) {
    //event.preventDefault();
    checkCity();
    contact.city = event.target.value;
});

//Vérification de l'email
document.getElementById("email").placeholder = "perrine.duval@gmail.com";

function checkEmail() {
    const email = document.getElementById("email").value;
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegExp.test(email)) {
        return;
    } else {
        const emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.innerText = `L'email renseigné n'est pas valide`;
    }
};

document.getElementById("email").addEventListener("change", function (event) {
    //event.preventDefault();
    checkEmail();
    contact.email = event.target.value;
});

//Mes appels target.value ne prennent pas en compte les valeurs renseignées.

//Cette fonction me permettra de remplir l'objet contact.
// document.getElementById("order").addEventListener("submit", function () {
//     postForData();
// });

// function getFormData() {
//     Récupération de toutes les autres fonctions.
// };

// function postFormData() {

//};

// const submitOrder = document.getElementById("order");
// submitOrder.addEventListener("submit", function (event) {
// event.preventDefault();
// });

//Création du tableau de produits - array de strings product-ID
const order = [];

function getOrder() {
    let cart = getCart();
    for (let orderedItem of cart) {
        order.push(orderedItem.id);
    };
    return order;
};
console.log(getOrder());


//Création de l'objet contact
const contact = {
    firstname: null,
    lastname: null,
    address: null,
    city: null,
    email: null
};
console.log(contact);

