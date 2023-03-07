/**Fonction de création et d'affichage d'une fiche produit */
function productCard(product) {
    const productCardLink = document.createElement("a");
    productCardLink.setAttribute("href", `./product.html?id=${product._id}`);
    const productCardElement = document.createElement("article");
    const imageUrlElement = document.createElement("img");
    imageUrlElement.src = product.imageUrl;
    imageUrlElement.alt = product.altTxt;
    const nameElement = document.createElement("h3");
    nameElement.innerText = product.name;
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = `Description : ${product.description}`;

    productCardLink.appendChild(productCardElement);
    productCardElement.appendChild(imageUrlElement);
    productCardElement.appendChild(nameElement);
    productCardElement.appendChild(descriptionElement);

    return productCardLink;
};

/** Fonction d'affichage de toutes les fiches produit */
export async function displayCards() {
    const result = await fetch("http://localhost:3000/api/products/");
    const products = await result.json();
    const sectionItems = document.querySelector(".items");
    for (let product of products) {
        const _productCard = productCard(product);
        sectionItems.appendChild(_productCard);
    }
};

displayCards();
