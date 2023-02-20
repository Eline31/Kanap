export async function fetchProduct(productId) {
    const result = await fetch(`http://localhost:3000/api/products/${productId}`);
    const product = await result.json();

    return product
};

export async function fetchProductCard(cart) {
    return Promise.all(cart.map(async (item) => {
        const itemFromAPI = await fetchProduct(item.id);
        return {
            ...itemFromAPI,
            ...item
        };
    }))
};