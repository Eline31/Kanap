//Fonction de création d'une fiche produit
function productCard(product) {
    const productCardLink = document.createElement("a");
    //de base c'était juste "href", product._id, puis id=${product._id} je l'ai remplacé par l'URL de la page produit
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


//Fonction d'affichage de toutes les fiches produits
export async function displayCards() {
    const result = await fetch("http://localhost:3000/api/products/");
    const products = await result.json();
    const sectionItems = document.querySelector(".items");
    for (let product of products) {
        const _productCard = productCard(product);
        sectionItems.appendChild(_productCard);//pourquoi rajouter une nouvelle fonction productCard ?
    }
};

displayCards();

//il faudrait que l'url proposée soit http://127.0.0.1:5500/front/html/product.html/id=...
//Création de la fonction URL
/*function productPage(id) {
    const resultId = await fetch("http://localhost:3000/api/products/{product-ID}");
    const productIdPage = await result.json();
    const productCardLink = document.querySelector(productCardLink);
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");

}
/*

let baseURL = "http://127.0.0.1:5500/front/html/";
let idURL = new URL("product._id", baseURL);
let params = new URLSearchParams();

<a href="./product.html?id=42">*/

/*const colorsElement = document.createElement("p");
colorsElement.innerText = `Couleurs : ${products[0].colors}`;
const priceElement = document.createElement("p");

//Rattachement des balises à l'élément productCards du DOM
sectionItems.appendChild(_productCard);
priceElement.innerText = `Prix : ${products[0].price} €`;*/

//productCards.appendChild(priceElement);
//productCards.appendChild(colorsElement);
