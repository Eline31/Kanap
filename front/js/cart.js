//import { getProduct } from "./product";

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

//quantity et chosenColor sont dit "undefined"
export function addToCart(item) {
    console.log(item.quantity);
    console.log(item.colors);
    console.log(item.id);
    if ((item.quantity > 0) && (item.colors != null)) {
        let cart = getCart();
        let addedItem = cart.find(it => (it.id == item.id) && (it.colors == item.colors));
        console.log("cart", cart);
        if (addedItem != undefined) {
            addedItem.quantity++;
            console.log("addedItem");
        } else {
            cart.push(item);
        };
        saveCart(cart);
    } else {
        alert("L'un des champs n'est pas correctement renseigné");
    }
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
            saveCart(cart);
        }
    }
};

/*function getId(id) {

    const result = await fetch(`http://localhost:3000/api/products/${productId}`);
    const product = await result.json();
};*/

//const price = price.toFixed(2); //Product not defined

async function showCart(item) {
    //Rajouter if else pour si mettre une seule ligne par produit et non par quantité
    let cart = getCart();
    for (let i = 0; i < cart.length; i++) {
        const item = cart.find(item => item.id);
        const itemId = item.id;
        console.log(itemId);
        const result = await fetch(`http://localhost:3000/api/products/${itemId}`);
        const it = await result.json();
        console.log(it);
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

        const contentDelete = document.createElement("div");
        contentDelete.classList.add("cart__item__content__settings__delete");

        itemContentSettings.appendChild(contentDelete);

        const deleteItem = document.createElement("p");
        deleteItem.classList.add("deleteItem");
        deleteItem.innerText = "Supprimer";

        contentDelete.appendChild(deleteItem);
    }
};
showCart();



/*function cartItemDetails(product) {
    const cartContent = document.getElementById("cart__items");
    const cartItem = document.createElement("article");
    cartItem.classList.add("cart__item");
    cartItem.dataset.id = productId;
    cartItem.dataset.color = productColor;

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
};*/



/*async function addedItem() {
    const result = await fetch(`http://localhost:3000/api/products/${productId}`);
    const product = await result.json();

    cartItemDetails(product);
};*/

//Une récupération des données des produits présents dans le panier (localStorage)
//Le prix total du panier
//Une fonction modificant la quantité d'un produit -et donc le total
//Une fonction permettant de supprimer un produit -et donc de recalculer le total