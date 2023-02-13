import { addToCart } from "./cart.js";

//Je récupère l'url de la page courante
const url = new URL(document.location);
//La propriété searchParams de l'url retourne un objet de type "URLSearchParams"
const searchParams = url.searchParams;
//Je récupère l'id du produit déjà présent dans l'URL
const productId = searchParams.get("id");

//Fonction permettant d'ajouter les infos produit au DOM
function addProductDetails(product) {
    const imageUrlContent = document.querySelector(".item__img");
    const imageUrlElement = document.createElement("img");
    imageUrlElement.src = product.imageUrl;
    imageUrlElement.alt = product.altTxt;
    const nameElement = document.getElementById("title");
    nameElement.innerText = product.name;
    const priceElement = document.getElementById("price");
    priceElement.innerText = product.price;
    const descriptionElement = document.getElementById("description");
    descriptionElement.innerText = product.description;
    const colorsContent = document.getElementById("colors");
    const colors = product.colors;
    //Création d'une fonction for pour afficher les éléments colors de l'API
    for (let i = 0; i < colors.length; i++) {
        const colorElement = document.createElement("option");
        colorElement.innerText = colors[i];
        colorsContent.appendChild(colorElement);
    };
    imageUrlContent.appendChild(imageUrlElement);
};

//Appel à l'API pour les infos du produit cliqué
async function getProduct() {
    const result = await fetch(`http://localhost:3000/api/products/${productId}`);
    const product = await result.json();
    addProductDetails(product);
};

getProduct();


/*//Récupération de toutes les données de l'API
const result = await fetch(`http://localhost:3000/api/products/`);
const _products = await result.json();
//Transformation en JSON
const productDetails = JSON.stringify(_products);
//Stockage des informations dans le localStorage
window.localStorage.setItem("items", productDetails);*/

//Création des 3 éléments à sotcker dans le localStorage (productId déjà défini)
//Déclaration de la variable d'un item pour le localStorage
const item = {
    id: productId,
    quantity: 0,
    colors: null
};
//Déclaration de la variable de la couleur choisie
document.getElementById("colors").addEventListener("change", function (event) {
    item.colors = event.target.value;
});
//Déclaration de la variable de la quantité choisie
document.getElementById("quantity").addEventListener("change", function (event) {
    item.quantity = event.target.value;
});

//------------------------LocalStorage---------------------------------
const addToCartBtn = document.getElementById("addToCart");
//Bouton pour stocker les items dans le localStorage
addToCartBtn.addEventListener("click", function () {
    addToCart(item);
});

