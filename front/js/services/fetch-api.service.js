const BASE_API_URL = "http://localhost:3000/api"

/** Fonction de récupération des données produit de l'API */
export async function fetchProduct(productId) {
    const result = await fetch(`${BASE_API_URL}/products/${productId}`);
    const product = await result.json();

    return product;
};

/** Fonction de récupération des informations produit de l'API par rapport à ceux du cart */
export async function fetchProductCard(cart) {
    return Promise.all(cart.map(async (item) => {
        const itemFromAPI = await fetchProduct(item.id);
        return itemFromAPI;
    }))
};

/**Fonction d'envoi de la commande à l'API */
export async function sendOrderAPI(contact, products) {
    // Envoi vers le serveur
    try {
        let response = await fetch(`${BASE_API_URL}/products/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ contact, products }),
        });
        let result = await response.json();
        document.location.href = ("href", `./confirmation.html?order=${result.orderId}`);
    } catch (e) {
        console.error(e);
    }
};