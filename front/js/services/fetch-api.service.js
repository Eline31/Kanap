const BASE_API_URL = "http://localhost:3000/api"

/** Fonction de récupération des données produit de l'API */
export async function fetchProduct(productId) {
    const result = await fetch(`${BASE_API_URL}/products/${productId}`);
    const product = await result.json();

    return product;
};

/** Fonction de récupération des informations produit de l'API par rapport à ceux du cart 
 * @description Cette fonction renverra les données de l'API des produits contenus dans le cart qui est passé en paramètre une fois la promesse de fetchProduct remplie
*/
export async function fetchProductCard(cart) {
    return Promise.all(cart.map(async (item) => {
        const itemFromAPI = await fetchProduct(item.id);
        return itemFromAPI;
    }))
};

/**Fonction d'envoi de la commande à l'API et récupération de la réponse pour redirection vers page de confirmation */
export async function sendOrderAPI(contact, products) {
    // Envoi vers le serveur
    try {
        let response = await fetch(`${BASE_API_URL}/products/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ contact, products }),
        });
        let result = await response.json();
        document.location.href = `http://127.0.0.1:5500/front/html/confirmation.html?order=${result.orderId}`;
    } catch (e) {
        console.log("Erreur du catch")
        console.error(e);
    }
};