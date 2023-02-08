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
    colorsContent.appendChild(colors);
};

//Appel à l'API pour les infos du produit cliqué
export async function getProduct() {
    const result = await fetch(`http://localhost:3000/api/products/${productId}`);
    const product = await result.json();

    addProductDetails(product);
};

getProduct();

/*//Récupération des données de l'API
const result = await fetch(`http://localhost:3000/api/products/`);
const _products = await result.json();
//Transformation en JSON
const productDetails = JSON.stringify(_products);
//Stockage des informations dans le localStorage
window.localStorage.setItem("items", productDetails);*/


const selectColor = document.getElementById("colors");
const selectedColor = selectColor.options[document.getElementById("colors").selectedIndex];
selectedColor.addEventListener("click", function () {
    return selectedColor.value;
});
//Autre option non concluante
/*const selectColor = [];
const selectBox = document.getElementById("colors");

for (i = 0; i < selectBox.length; i++) {
    if (selectBox[i].selected) {
        selectColor.push(selectBox[i]);
    }
};*/

const quantity = document.getElementById("quantity");

let addedItem = {
    id: productId,
    quantité: quantity.value,
    couleurs: selectedColor.value
};

let items = [addedItem];

//let addedItem = JSON.stringify(objAddedItem);

const addToCartBtn = document.getElementById("addToCart");
//Le bouton fonctionne mais pas qté et couleurs
addToCartBtn.addEventListener("click", function () {
    if ((quantity.value > 0) && (selectedColor.value != "--SVP, choisissez une couleur --")) {
        window.localStorage.setItem("item", JSON.stringify(items));
    } else {
        alert("L'un des champs n'est pas correctement renseigné")
    }
});