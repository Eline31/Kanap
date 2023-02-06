//Il me faut une fonction qui lise l'URL pour repérer l'id et afficher
//Je récupère l'url courante
const url = new URL(document.location);
//La propriété searchParams de url retourne un objet de type "URLSearchParams"
const searchParams = url.searchParams;
//Je récupère l'id du produit déjà présent dans l'URL
const productId = searchParams.get("id");

//les informations du produit en conséquence
//Création de la fonction URL
function showProduct(product) {
    const productDetails = document.querySelector(".item");
    const imageUrlContent = document.querySelector(".item_img");
    const imageUrlElement = document.createElement("img");
    imageUrlElement.src = product.imageUrl;
    imageUrlElement.alt = product.altTxt;
    console.log(imageUrlElement); // ça fonctionne, je ne comprends pas le pbm d'affichage
    const productContentElement = document.querySelector(".item_content");
    const titlePriceElement = document.querySelector(".item_content_titlePrice");
    const nameElement = document.querySelector("#title");
    nameElement.innerText = product.name;
    const priceElement = document.querySelector("#price");
    priceElement.innerText = product.price;
    //const productDescriptionElement = document.querySelector(".item_content_description");
    const descriptionElement = document.querySelector("#description");
    descriptionElement.innerText = product.description;
    const colorsContent = document.querySelector("#colors");
    const colors = product.colors;
    for (let i = 0; i < colors.length; i++) {
        const colorElement = document.createElement("option");
        colorElement.innerText = colors[i];
        colorsContent.appendChild(colorElement);
    };//Attention, apparaît en double !!

    //productDetails.appendChild(imageUrlElement);
    productDetails.appendChild(imageUrlContent);
    imageUrlContent.appendChild(imageUrlElement);
    productDetails.appendChild(productContentElement);
    productContentElement.appendChild(titlePriceElement);
    titlePriceElement.appendChild(nameElement);
    titlePriceElement.appendChild(priceElement);
    productDetails.appendChild(descriptionElement);
    productDetails.appendChild(colorsContent);

    return productDetails;
};

//Vaut-il mieux mettre des .then et .catch ??
/* const result = () => fetch(`http://localhost:3000/api/products/${productId}`)
    .then (product => result.jason());
    .catch(err => {});*/
async function getProduct() {
    const result = await fetch(`http://localhost:3000/api/products/${productId}`);
    const product = await result.json();
    //const productDetails = document.querySelector(".item");
    return showProduct(product);
};

getProduct();