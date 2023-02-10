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

function color() {
    document.querySelector("#colors").addEventListener("change", function (a) {
        const color = a.currentTarget.value;//ou .selectedOptions en plus de value ?
        console.log(color);
    });
};
let selectedColor = color();

function quantityValue() {
    document.getElementById("quantity").addEventListener("change", function (b) {
        const quantity = parseInt(b.currentTarget.value);
        console.log(quantity);
    })
};
let quantity = quantityValue();

//Déclaration de la variable d'un item pour le localStorage
const item = {
    id: productId,
    quantite: quantity,
    couleurs: selectedColor
};

////D'abord, vérification que l'iten ne soit pas déjà dans le localStorage
let addedItem = JSON.parse(window.localStorage.getItem("item"));
console.log(addedItem);

//Signifier que le basket est un tableau
//let items = [addedItem];
//const cart = [item];//window.localStorage.getItem("item");
if (cart == null) {
    cart = [];//Problème sur cette ligne!!
} else {
    cart = JSON.parse(cart);
};

//window.localStorage.setItem("items", JSON.stringify(item));

const addToCartBtn = document.getElementById("addToCart");
//Bouton pour stocker les items dans le localStorage
addToCartBtn.addEventListener("click", function () {
    if ((item.quantity > 0) && (item.selectedColor != "--SVP, choisissez une couleur --")) {
        let addedItem = JSON.parse(window.localStorage.getItem("item"));
        console.log(addedItem);

        window.localStorage.setItem("item", JSON.stringify(cart));
        cart.push(item);
        //Signifier que le basket est un tableau
        //let items = [addedItem];
        //const cart = [item];//window.localStorage.getItem("item");
        if (cart == null) {
            cart = [];//Problème sur cette ligne!!
        } else {
            cart = JSON.parse(cart);
        };
    } else {
        alert("L'un des champs n'est pas correctement renseigné");
    }
});
//Créer une nouvelle condition pour n'ajouter que la qté si l'item
//existe déjà dans le panier !
/*try {
    window.localStorage.setItem("item", JSON.stringify(cart));
} catch (error) {
    console.log("Ceci n'a pas fonctionné");
};*/


