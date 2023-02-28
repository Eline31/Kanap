const LOCAL_STORAGE_KEY = "cart";

export function saveToLocalStorageCart(cart) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
};

export function getCartFromLocalStorage() {
    let cart = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    //Si le panier est vide
    if (cart == null) {
        return [];
    }
    //Si le panier existe déjà
    else {
        return JSON.parse(cart);
    }
};
