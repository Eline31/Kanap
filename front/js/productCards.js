//Récupération des produits de l'API
/*await - mais pas de fonction async - dois-je rajouter un .then pour la promise ?*/
const products = fetch("http://localhost:3000/api/products/").then(products => products.json());
//Créer une fonction displayProductCards pour afficher toutes les cartes
// Elle doit appeler productCards à l'intérieur avec une boucle for
// Elle doit récupérer l'élément avec l'id items dans index.html pour pouvoir insérer les productCards à l'intérieur

//Création des éléments de productCards dans le DOM
//const article = productCards[0];
//Créer une fonction productCard pour en afficher une
function productCard(products) {

}

function displayProductCards(products) {
    for (let i = 0; i < products.length; i++) {
        //Récupération de l'élément du DOM qui accueillera les cards
        const productCards = document.querySelector(".items");
        //Création d'une balise dédiée à un produit
        const idElement = document.createElement("a");
        idElement.dataset._id = products[0]._id;
        idElement.setAttribute("href", `${products[0]._id}`);
        /*idElement.addEventListener("click", async function (event) {
            console.log(`${products[i]._id}`)
        });*/
        //Création des autres balises
        const productCardsElement = document.createElement("article");
        const imageUrlElement = document.createElement("img");
        imageUrlElement.src = products[0].imageUrl;
        const altTxtElement = document.createAttribute("alt");
        altTxtElement.innerText = products[0].altTxt;
        const nameElement = document.createElement("h3");
        nameElement.innerText = products[0].name;
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = `Description : ${products[0].description}`;

        /*const colorsElement = document.createElement("p");
        colorsElement.innerText = `Couleurs : ${products[0].colors}`;
        
        const priceElement = document.createElement("p");
        priceElement.innerText = `Prix : ${products[0].price} €`;*/

        //Rattachement des balises à l'élément productCards du DOM
        productCards.appendChild(idElement);
        idElement.appendChild(productCardsElement);
        productCardsElement.appendChild(imageUrlElement);
        imageUrlElement.appendChild(altTxtElement);
        productCardsElement.appendChild(nameElement);
        productCardsElement.appendChild(descriptionElement);
    }
};

//Tentative de génération de la page pour la première fois
displayProductCards(products);

//productCards.appendChild(priceElement);
//productCards.appendChild(colorsElement);

/*const productCardsElement = document.createElement("article");
for (let i = 0; i < productCards.length; i++) {
    productCardsElement.innerHTML += "{
        colors "*/


