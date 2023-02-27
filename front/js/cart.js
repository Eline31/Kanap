import { fetchProductCard } from "./fetch.js";
/*******************Fonctions de gestion du panier*************************************/
//La clé utilisée pour identifier le localStorage
const storageKey = "cart";

let dataFromAPI = [];

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

//Cette fonction permet de sauvegarder tous les items ayant un id et une couleur différente de celui que l'on veut supprimer
export function removeFromCart(item) {
    let cart = getCart();
    cart = cart.filter(it => ((it.id != item.id) || ((it.id == item.id) && (it.colors != item.colors))));
    saveCart(cart);
    showCart();
};

//Fonction de changement de la quantité d'un item dans le panier
export function changeQuantity(item) {
    let cart = getCart();
    let spottedItem = cart.find(it => ((it.id == item.id) && (it.colors == item.colors)));
    spottedItem.quantity = parseInt(item.quantity);
    saveCart(cart);
    showCart();
};
//---------------------Fin fonctions gestion panier------------------------

/******************Affichage panier*******************************************/
//Fonction d'initialisation du panier
async function initCart() {
    let cart = getCart();
    dataFromAPI = await fetchProductCard(cart);
    showCart();
};

async function showCart() {
    let cart = getCart();
    const cartWithDataFromAPI = cart.map(item => {
        const APIItem = dataFromAPI.find(itemFromAPI => itemFromAPI._id === item.id);
        return { ...APIItem, ...item };
    });
    const cartContent = document.getElementById("cart__items");
    for (const child of cartContent.children) {
        cartContent.removeChild(child);
    };
    let totalQuantity = 0;
    let totalPrice = 0;
    for (let i = 0; i < cartWithDataFromAPI.length; i++) {
        const item = cartWithDataFromAPI[i];
        //const cartContent = document.getElementById("cart__items");
        const cartItem = document.createElement("article");
        cartItem.classList.add("cart__item");
        cartItem.dataset.id = item.id;
        cartItem.dataset.color = item.colors;

        cartContent.appendChild(cartItem);

        const itemImg = document.createElement("div");
        itemImg.classList.add("cart__item__img");

        const imageElement = document.createElement("img");
        imageElement.src = item.imageUrl
        imageElement.alt = item.altTxt;

        cartItem.appendChild(itemImg);
        itemImg.appendChild(imageElement);

        const itemContent = document.createElement("div");
        itemContent.classList.add("cart__item__content");

        cartItem.appendChild(itemContent);

        const itemDescription = document.createElement("div");
        itemDescription.classList.add("cart__item__content__description");

        itemContent.appendChild(itemDescription);

        const itemName = document.createElement("h2");
        itemName.innerText = item.name;
        const itemColor = document.createElement("p");
        itemColor.innerText = item.colors;
        const itemPrice = document.createElement("p");
        itemPrice.classList.add("itemPrice");
        itemPrice.innerText = `${item.price.toFixed(2)} €`;

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
        });

        totalQuantity += parseInt(item.quantity);
        totalPrice += parseInt(item.quantity) * item.price;
    };

    const totalQtyElement = document.getElementById("totalQuantity");
    totalQtyElement.innerText = totalQuantity;

    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.innerText = totalPrice;

};

initCart();

/***********************Fin affichage panier*****************************/

