//Fonction de création d'une fiche produit
function productCard(product) {
    const productCardLink = document.createElement("a");
    productCardLink.setAttribute("href", product._id);
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

//Fonction d'affichage de toutes les fiches produits
export async function displayCards() {
    const result = await fetch("http://localhost:3000/api/products/");
    const products = await result.json();
    const sectionItems = document.querySelector(".items");
    for (let product of products) {
        const _productCard = productCard(product);
    }
};

displayCards();

/*const colorsElement = document.createElement("p");
colorsElement.innerText = `Couleurs : ${products[0].colors}`;

const priceElement = document.createElement("p");

//Rattachement des balises à l'élément productCards du DOM
sectionItems.appendChild(_productCard);
priceElement.innerText = `Prix : ${products[0].price} €`;*/

/*const productCards = [];
for (let i = 0; i < products.length; i++) {
    productCards.push({
        id: products._id++,
        img: products.imageUrl++,
        name: products.name++,
        description: products.description++,
    });
};*/

/*function displayProductCards() {
    for (let product of products) {

    }
}*/


//productCards.appendChild(priceElement);
//productCards.appendChild(colorsElement);

/*const productCardsElement = document.createElement("article");
for (let i = 0; i < productCards.length; i++) {
    productCardsElement.innerHTML += "{
        colors "*/


