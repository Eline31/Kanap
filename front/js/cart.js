//import { getProduct } from "./product";

export function saveCart(cart) {
    window.localStorage.setItem("cart", JSON.stringify(cart));
};

export function getCart() {
    let cart = window.localStorage.getItem("cart");
    //Si le panier est vide
    if (cart == null) {
        return [];
    }
    //Si le panier existe déjà
    else {
        return JSON.parse("cart");
    }
};

export function addToCart(item) {
    let cart = getCart();
    let addedItem = cart.find(it => it.id == item.id);
    if (addedItem != undefined) {
        addedItem.quantity++;
    } else {
        item.quantity = 1;
        cart.push(item);
    }
    saveCart(cart);
};

//Voir pour utiliser plutôt removeItem
export function removeFromCart(item) {
    let cart = getCart();
    cart = cart.filter(it => it.id != item.id);
    saveCart(cart);
};

export function changeQuantity(item, quantity) {
    let cart = getCart();
    let addedItem = cart.find(it => it.id == item.id);
    if (addedItem != undefined) {
        addedItem.quantity += quantity;
        if (addedItem.quantity <= 0) {
            removeFromCart(addedItem);
        }
        else {
            saveCart(Cart);
        }
    }
}

/*const price = product.price.toFixed(2); //Product not defined

//Récupération des produits stockés dans le localStorage
let itemsInStorage = window.localStorage.getItem("items".toString());

function cartItemDetails(product) {
    const cartContent = document.getElementById("cart__items");
    const cartItem = document.createElement("article");
    cartItem.classList.add("cart__item");

    cartContent.appendChild(cartItem);

    const itemImg = document.createElement("div");
    itemImg.classList.add("cart__item__img");

    const imageElement = document.createElement("img");
    imageElement.src = product.imageUrl
    imageElement.alt = product.altTxt;

    cartItem.appendChild(cartItemImg);
    cartItemImg.appendChild(imageElement);

    const itemContent = document.createElement("div");
    itemContent.classList.add("cart__item__content");

    cartItem.appendChild(itemContent);

    const itemDescription = document.createElement("div");
    itemDescription.classList.add("cart__item__content__description");

    itemContent.appendChild(itemDescription);

    const itemName = document.createElement("h2");
    itemName.innerText = product.name;
    const itemColor = document.createElement("p");
    itemColor.innterText = product.color; //à définir !! pas encore défini
    const itemPrice = document.createElement("p");
    const price = product.price.toFixed(2);
    itemPrice.innterText = `${price} €`;

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
    quantity.innerText = "Qté :";
    const itemQuantity = document.createElement("input");
    itemQuantity.type = "number";
    itemQuantity.classList.add("itemQuantity");
    itemQuantity.min = "1";
    itemQuantity.max = "100";
    itemQuantity.value = "42";

    contentQuantity.appendChild(quantity);
    contentQuantity.appendChild(itemQuantity);

    const contentDelete = document.createElement("div");
    contentDelete.classList.add("cart__item__content__settings__delete");

    itemContentSettings.appendChild(contentDelete);

    const deleteItem = document.createElement("p");
    deleteItem.classList.add("deleteItem");
    deleteItem = "Supprimer";

    contentDelete.appendChild(deleteItem);
};



async function addedItem() {
    const result = await fetch(`http://localhost:3000/api/products/${productId}`);
    const product = await result.json();

    cartItemDetails(product);
};

//Une récupération des données des produits présents dans le panier (localStorage)
//Le prix total du panier
//Une fonction modificant la quantité d'un produit -et donc le total
//Une fonction permettant de supprimer un produit -et donc le total
/*au click, si qté du produit >1, retirer 1, -=1, par contre 
si produit=1, alors removeItem du panier/localStorage*/

