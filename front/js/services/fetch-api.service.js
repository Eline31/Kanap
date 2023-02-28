const BASE_API_URL = "http://localhost:3000/api"

/** Récupération des données produit de l'API */
export async function fetchProduct(productId) {
    const result = await fetch(`${BASE_API_URL}/products/${productId}`);
    const product = await result.json();

    return product
};

/** Fonction de fusion des données produit de l'API et du cart */
export async function fetchProductCard(cart) {
    return Promise.all(cart.map(async (item) => {
        const itemFromAPI = await fetchProduct(item.id);
        return itemFromAPI;
    }))
};