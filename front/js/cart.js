import { fetchProductCard } from "./services/fetch-api.service.js";
import { getCartFromLocalStorage } from "./services/localstorage.service.js"
import { removeFromCart, changeQuantity } from "./utils/cart.utils.js"

//---------------------Fin fonctions gestion panier------------------------

/******************Affichage panier*******************************************/

let dataFromAPI = [];

//Fonction d'initialisation du panier
async function initCart() {
    let cart = getCartFromLocalStorage();
    dataFromAPI = await fetchProductCard(cart);
    displayCart();
    displayTotal();
};

function getCartWithDataFromAPI() {
    let cart = getCartFromLocalStorage();
    const cartWithDataFromAPI = cart.map(item => {
        const APIItem = dataFromAPI.find(itemFromAPI => itemFromAPI._id === item.id);
        return { ...APIItem, ...item };
    });
    return cartWithDataFromAPI
}

function displayTotal() {
    const cartWithDataFromAPI = getCartWithDataFromAPI()
    const { totalQuantity, totalPrice } = cartWithDataFromAPI.reduce((acc, cur) => {
        return {
            totalQuantity: acc.totalQuantity + parseInt(cur.quantity),
            totalPrice: acc.totalPrice + parseInt(cur.quantity) * cur.price
        }
    }, { totalQuantity: 0, totalPrice: 0 })

    const totalQtyElement = document.getElementById("totalQuantity");
    totalQtyElement.innerText = totalQuantity;

    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.innerText = totalPrice;
}

function displayCart() {
    const cartWithDataFromAPI = getCartWithDataFromAPI()
    const cartContent = document.getElementById("cart__items");

    for (let i = 0; i < cartWithDataFromAPI.length; i++) {
        const item = cartWithDataFromAPI[i]
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
            changeQuantity(item, event.target.value);
            displayTotal()
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
            cartContent.removeChild(cartItem)
            displayTotal()
        });
    };
};

initCart();

/***********************Fin affichage panier*****************************/

