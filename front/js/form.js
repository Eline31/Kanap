import { getCart } from "./cart.js";
//*****************************FORMULAIRE******************************** */
//****************Récupération données formulaire via URL************** */
//La méthode substring permet d'isoler un élément de la chaîne récupérée, ici ?
// const formInfosInURL = location.search.substring(1);
//La méthode split permet de diviser une chaîne de caractère sur un séparateur dans un tableau
// const arrayContact = formInfosInURL.split("&");
// console.log(arrayContact);
//Il ne reste qu’à isoler le nom du paramètre ou de la variable avec sa 
//valeur. Pour ce faire il faut utiliser la méthode " substring " jumelé 
//avec la méthode " indexOf " qui permet de donner la position d’un 
//caractère dans une chaîne de caractères.
/*for (let i = 0; i < formInfosInURL.length; i++) {
    //const keys = arrayContact[i].substring(0, arrayContact[i].indexOf("="));
    //console.log(keys);
    //Pour extraire la valeur il faut partir de la position du " = " + 1 à la 
    //longueur totale de la chaîne soit " length ".
    const contactDetail = arrayContact[i].substring(arrayContact[i].indexOf("=") + 1, arrayContact[i].length);
    console.log(contactDetail);
};*/


// param = new FaitTableau(nReq.length - 1)
// for (let i = 0; i < (nReq.length); i++) {
//     param[i] = nReq[i]
// };
// console.log(param);


//Vérification du prénom
document.getElementById("firstName").placeholder = "Perrine";

const namesRegex = /^[A-Za-z\-\s*]+$/;

function checkFirstName() {
    const firstName = document.getElementById("firstName").value;
    if (namesRegex.test(firstName)) {
        return;
    } else {
        const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerText = "Le prénom renseigné n'est pas valide !";
    }
};

document.getElementById("firstName").addEventListener("change", function (event) {
    //event.preventDefault();
    checkFirstName();
    return event.target.value;
});

//Vérification du nom
document.getElementById("lastName").placeholder = "Duval";

function checkLastName() {
    const lastName = document.getElementById("lastName").value;
    if (namesRegex.test(lastName)) {
        return;
    } else {
        const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        lastNameErrorMsg.innerText = "Le nom renseigné n'est pas valide !";
    }
};

document.getElementById("lastName").addEventListener("change", function (event) {
    //event.preventDefault();
    checkLastName();
    return event.target.value;
});

//Vérification de l'adresse
document.getElementById("address").placeholder = "3 passage des prés";

function checkAddress() {
    const address = document.getElementById("address").value;
    const addressRegex = /(^[0-9\,]{1,3})\s*([A-Za-z\-\,\s*]+)$/;
    if (addressRegex.test(address)) {
        return;
    } else {
        const addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.innerText = `L'adresse renseignée n'est pas valide`;
    }
};

document.getElementById("address").addEventListener("change", function (event) {
    //event.preventDefault();
    checkAddress();
    return event.target.value;
});

//Vérification de la ville
document.getElementById("city").placeholder = "35000 Rennes";
//On pourrait utiliser le .replace pour enregistrer l'info comme on la veut https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp

function checkCity() {
    const city = document.getElementById("city").value;
    const cityRegex = /(^[A-Za-z-\s*]+)\s*([0-9]{5})$/;
    if (cityRegex.test(city)) {
        return;
    } else {
        const cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.innerText = "La ville indiquée n'est pas valide !";
    }
};

document.getElementById("city").addEventListener("change", function (event) {
    //event.preventDefault();
    checkCity();
    return event.target.value;
});

//Vérification de l'email
document.getElementById("email").placeholder = "perrine.duval@gmail.com";

function checkEmail() {
    const email = document.getElementById("email").value;
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegExp.test(email)) {
        return;
    } else {
        const emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.innerText = `L'email renseigné n'est pas valide`;
    }
};

document.getElementById("email").addEventListener("change", function (event) {
    //event.preventDefault();
    checkEmail();
    return event.target.value;
});

//Mes appels target.value ne prennent pas en compte les valeurs renseignées.

//Cette fonction me permettra de remplir l'objet contact.
// document.getElementById("order").addEventListener("submit", function () {
//     postForData();
// });

// function getFormData() {
//     Récupération de toutes les autres fonctions.
// };

// function postFormData() {

//};

// const submitOrder = document.getElementById("order");
// submitOrder.addEventListener("submit", function (event) {
// event.preventDefault();
// });

//Création du tableau de produits - array de strings product-ID
const order = [];

function getOrder() {
    let cart = getCart();
    for (let orderedItem of cart) {
        order.push(orderedItem.id);
    };
    return order;
};



//Création de l'objet contact
// const contact = {
//     firstname: getFirstName(),
//     lastname: getLastName(),
//     address: getAddress(),
//     city: getCity(),
//     email: getEmail()
// };
//ou autrement :
//Quand je clique sur le bouton submit, je reçois dans un tableau les id produits 
//et dans un objet les détails de contact.
document.getElementById("order").addEventListener("click", function (event) {
    event.preventDefault();
    const contact = {
        firstname: document.getElementById("firstName").value,
        lastname: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    }
    console.log(contact);
    getOrder();
    console.log(getOrder());
});



//L'URL et particulièrement les paramètres doivent être encodés
//avant d’être transmises. La fonction encodeURI() permet de
// convertir tous les caractères spéciaux à l’exception de : , / ? :
// @ & = + $ # (Utiliser encodeURIComponent() pour encoder tout les
// caractères.)
//encodeURI("window.location.href"); pour l'envoyer en POST

/*const paramOk = true;

function FaitTableau(n) {
    // Création d’un tableau (array)
    // aux dimensions du nombre de paramètres.
    this.length = n;
    for (let i = 0; i <= n; i++) {
        this[i] = 0
    }
    return this
};

function ParamValeur(nValeur) {
    // Récupération de la valeur d’une variable
    // Pour créer la variable en Javascript.
    const nTemp = "";
    for (var i = 0; i < (param.length + 1); i++) {
        if (param[i].substring(0, param[i].indexOf("=")) == nValeur)
            nTemp = param[i].substring(param[i].indexOf("=") + 1, param[i].length)
    }
    return Decode(nTemp)
};

// Extraction des paramètres de la requête HTTP
// et initialise la variable "paramOk" à false
// s’il n’y a aucun paramètre.
if (!location.search) {
    paramOk = false;
}
else {
    // Éliminer le "?"
    nReq = location.search.substring(1)
    // Extrait les différents paramètres avec leur valeur.
    nReq = nReq.split("&");
    param = new FaitTableau(nReq.length - 1)
    for (let i = 0; i < (nReq.length); i++) {
        param[i] = nReq[i]
    }
};

// Décoder la requête HTTP
// manuellement pour le signe (+)
function Decode(tChaine) {
    while (true) {
        let i = tChaine.indexOf("+");
        if (i < 0) break;
        tChaine = tChaine.substring(0, i) + "%20" + tChaine.substring(i + 1, tChaine.length);
    }
    return toString(tChaine);
};

// Créer les variables avec leur contenu
// basé sur la requête:
// ?nom=...&prenom=...&email=...
if (paramOk) {
    firstName = ParamValeur("firstName");
    lastName = ParamValeur("lastName");
    address = ParamValeur("address");
    city = ParamValeur("city");
    email = ParamValeur("email");
};*/