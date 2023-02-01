//Il me faut une fonction qui lise l'URL pour repérer l'id et afficher
//les informations du produit en conséquence
//Création de la fonction URL
function productPage(product_id) {
    const productDetails = document.querySelector(".item");
    const imageUrlElement = document.querySelector(".item_img");
    imageUrlElement.src = product.imageUrl;
    imageUrlElement.alt = product.altTxt;
    const productContentElement = document.querySelector(".item_content");
    const titlePriceElement = document.querySelector(".item_content_titlePrice");
    const nameElement = document.querySelector("#title");
    nameElement.innerText = product.name;
    const priceElement = document.querySelector("#price");
    priceElement.innerText = product.name;
    const productDescriptionElement = document.querySelector(".item_content_description");
    const descriptionElement = document.querySelector("#description");
    descriptionElement.innerText = product.description;
    const ColorsElement = document.querySelector("#colors");
    ColorsElement.innerText = product.colors;

    productDetails.appendChild(imageUrlElement);
    productDetails.appendChild(productContentElement);
    productContentElement.appendChild(titlePriceElement);
    titlePriceElement.appendChild(nameElement);
    titlePriceElement.appendChild(priceElement);
    productDescriptionElement.appendChild(descriptionElement);
    productDetails.appendChild(ColorsElement);

    return productDetails;
};

async function displayProductPage() {
    const result = await fetch("http://localhost:3000/api/products/");
    const products = await result.json();
    const productDetails = document.querySelector(".item");
    //Je récupère l'url courante
    const url = new URL(document.location);
    //La propriété searchParams de url retourne un objet de type "URLSearchParams"
    const searchParams = url.searchParams;
    //Je récupère l'id du produit déjà présent dans l'URL
    searchParams.get("id");
    for (let product of products) {
        const _productPage = productPage(product);
        productDetails.appendChild(_productPage);
    }
};

//displayProductPage();