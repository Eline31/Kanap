import { saveToLocalStorageCart, getCartFromLocalStorage } from "../services/localstorage.service.js"

/*******************Fonctions de gestion du panier*************************************/

/**Fonction d'ajout d'un item au panier */
export function addToCart(item) {
    if ((item.quantity > 0) && (item.colors != null)) {
        let cart = getCartFromLocalStorage();
        let addedItem = cart.find(it => (it.id == item.id) && (it.colors == item.colors));
        if (addedItem != undefined) {
            addedItem.quantity++;
        } else {
            cart.push(item);
        };
        saveToLocalStorageCart(cart);
    } else {
        alert("L'un des champs n'est pas correctement renseigné");
    }
};

/**Fonction de suppression d'un item, elle permet de sauvegarder tous les items ayant un id et une couleur différente de celui que l'on veut supprimer */
export function removeFromCart(item) {
    let cart = getCartFromLocalStorage();
    cart = cart.filter(it => ((it.id != item.id) || ((it.id == item.id) && (it.colors != item.colors))));
    saveToLocalStorageCart(cart);
};

/**Fonction de modification de la quantité d'un item dans le panier */
export function changeQuantity(item, quantity) {
    let cart = getCartFromLocalStorage();
    let spottedItem = cart.find(it => ((it.id == item.id) && (it.colors == item.colors)));
    spottedItem.quantity = parseInt(quantity);
    saveToLocalStorageCart(cart);
};