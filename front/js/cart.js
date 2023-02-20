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
            //getTotalQty();
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

//Faire fonctionner le bouton de suppression et le bouton de qté

function getTotalQty() {
    let cart = getCart();
    let quantities = cart.map(item => parseInt(item.quantity));
    let totalQuantity = 0;
    for (let i = 0; i < quantities.length; i++) {
        totalQuantity += quantities[i];
    };
    return totalQuantity;
};
//Une récupération des données des produits présents dans le panier (localStorage)
//Le prix total du panier
//Une fonction modificant la quantité d'un produit -et donc le total
//Une fonction permettant de supprimer un produit -et donc de recalculer le total

//-------------------------------Formulaire--------------------------
//Ajouter des attributs placeholder
//Vérification du prénom
const firstName = document.getElementById("firstName");
document.getElementById("firstName").placeholder = "Perrine";

const namesRegex = /^[A-Za-z\-\s*]+$/;

function checkFirstName(firstName) {
    if (namesRegex.test(firstName)) {
        return;
    } else {
        const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerText = "Le prénom renseigné n'est pas valide !";
    }
};

firstName.addEventListener("change", function () {
    //event.preventDefault();
    checkFirstName(firstName);
});

const lastName = document.getElementById("lastName");
document.getElementById("lastName").placeholder = "Duval";

function checkLasttName(lastName) {
    if (namesRegex.test(lastName)) {
        return;
    } else {
        const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        lastNameErrorMsg.innerText = "Le nom renseigné n'est pas valide !";
    }
};

lastName.addEventListener("change", function () {
    //event.preventDefault();
    checkLastName(lastName);
});

const address = document.getElementById("address");
document.getElementById("address").placeholder = "3 passage des prés";

function checkAddress(address) {
    const addressRegex = /(^[0-9\,]{1,3})\s*([A-Za-z\-\,\s*]+)$/;
    if (addressRegex.test(address)) {
        return;
    } else {
        const addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.innerText = `L'adresse renseignée n'est pas valide`;
    }
};

address.addEventListener("change", function () {
    //event.preventDefault();
    checkAddress(address);
});

const city = document.getElementById("city");
document.getElementById("city").placeholder = "35000 Rennes";
//On pourrait utiliser le .replace pour enregistrer l'info comme on la veut https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp

function checkCity(city) {
    const cityRegex = /(^[A-Za-z-\s*]+)\s*([0-9]{5})$/;
    if (cityRegex.test(city)) {
        return;
    } else {
        const cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.innerText = "La ville indiquée n'est pas valide !";
    }
};

city.addEventListener("change", function () {
    //event.preventDefault();
    checkCity(city);
});

//Vérification de l'email
const email = document.getElementById("email");
document.getElementById("email").placeholder = "perrine.duval@gmail.com";

function checkEmail(email) {
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegExp.test(email)) {
        return;
    } else {
        const emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.innerText = `L'email renseigné n'est pas valide`;
    }
};

email.addEventListener("change", function () {
    //event.preventDefault();
    checkEmail(email);
});

//Cette fonction me permettra de remplir l'objet contact.
// function getFormData() {
//     Récupération de toutes les autres fonctions.
// };
// function checkFormData() {

// };
// function postFormData() {

//};

// const submitOrder = document.getElementById("order");
// submitOrder.addEventListener("submit", function (event) {
// event.preventDefault();
// });



// };la fonction match pourra être utilisée pour récupérer les données, ici CP et ville


//Création de l'objet contact
const contact = {
    firstname: null,
    lastname: null,
    address: null,
    city: null,
    email: null
};


