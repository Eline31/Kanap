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
export async function getProduct() {
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
//const colorInput = document.getElementById("colors");
//const selectedColor = selectColor.options[document.getElementById("colors").selectedIndex];
//const color = colorInput.value;

/*export function color() {
    document.querySelector("#colors").addEventListener("change", function (a) {
        return a.currentTarget.value;//ou .selectedOptions en plus de value ?
    });
};
let selectedColor = color();*/


let select = document.querySelector("#colors");
let choice = select.selectedIndex;
let chosenColor = select.options[choice].text;
console.log(chosenColor);

export function quantityValue() {
    document.getElementById("quantity").addEventListener("change", function (b) {
        return parseInt(b.currentTarget.value);
    });
};
let quantity = quantityValue();

//Déclaration de la variable d'un item pour le localStorage
const item = {
    id: productId,
    quantity: quantity, //Le console log ne fonctionne pas !
    colors: selectedColor
};

//------------------------LocalStorage---------------------------------

/*const addToCartBtn = document.getElementById("addToCart");
//Bouton pour stocker les items dans le localStorage
addToCartBtn.addEventListener("click", function () {
    //event.preventDefault();
    if ((quantity > 0) && (selectedColor != "--SVP, choisissez une couleur --")) {
        //Vérification que l'item ne soit pas déjà dans le localStorage
        let itemInCart = JSON.parse(window.localStorage.getItem("item"));
        //Si le produit est déjà enregistré dans le localStorage
        if ((itemInCart) && (productId === item.id) && (selectedColor === item.colors)) {
            // item.quantity++;
            itemInCart.push(item);
            console.log(item.id);
            try {
                window.localStorage.setItem("item", JSON.stringify(itemInCart));
            } catch (error) {
                console.log("Ceci n'a pas fonctionné");
            };
        }
        //S'il n'y a pas de produits enregistrés dans le localStorage
        else {
            itemInCart = [];
            itemInCart.push(itemInfo);
            try {
                window.localStorage.setItem("item", JSON.stringify(itemInCart));
            } catch (error) {
                console.log("Ceci n'a pas fonctionné");
            };
        }
    } else {
        alert("L'un des champs n'est pas correctement renseigné");

    }
});
//Créer une nouvelle condition pour n'ajouter que la qté si l'item
//existe déjà dans le panier !*/


