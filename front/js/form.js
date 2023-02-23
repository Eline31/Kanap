import { getCart } from "./cart.js";
//*****************************FORMULAIRE******************************** */

//****************Manière de faire sans utiliser l'URL *************/

//Ajout de placeholders dans les champs du formulaire
document.getElementById("firstName").placeholder = "Perrine";
document.getElementById("lastName").placeholder = "Duval";
document.getElementById("address").placeholder = "3 passage des prés";
document.getElementById("city").placeholder = "35000 Rennes";
document.getElementById("email").placeholder = "perrine.duval@gmail.com";

//Les RegExp
const namesRegex = /[A-Za-z\-\s*]+/;
const addressRegex = /([0-9\,]{1,3})\s*([A-Za-z\-\,\s*]+)/;
const cityRegex = /([A-Za-z-\s*]+)\s*([0-9]{5})/;
const emailRegExp = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Vérification du prénom
function checkFirstName() {
    const firstName = document.getElementById("firstName").value;
    if (namesRegex.test(firstName)) {
        firstNameErrorMsg.innerText = "";
        return true;
    } else {
        const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerText = "Le prénom renseigné n'est pas valide !";
        return false;
    }
};

document.getElementById("firstName").addEventListener("change", function (event) {
    event.preventDefault();
    checkFirstName();
});

//Vérification du nom
function checkLastName() {
    const lastName = document.getElementById("lastName").value;
    if (namesRegex.test(lastName)) {
        lastNameErrorMsg.innerText = "";
        return true;
    } else {
        const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        lastNameErrorMsg.innerText = "Le nom renseigné n'est pas valide !";
        return false;
    }
};

document.getElementById("lastName").addEventListener("change", function (event) {
    event.preventDefault();
    checkLastName();
});

//Vérification de l'adresse
function checkAddress() {
    const address = document.getElementById("address").value;
    if (addressRegex.test(address)) {
        addressErrorMsg.innerText = "";
        return true;
    } else {
        const addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.innerText = `L'adresse renseignée n'est pas valide`;
        return false;
    }
};

document.getElementById("address").addEventListener("change", function (event) {
    event.preventDefault();
    checkAddress();
});

//Vérification de la ville

//On pourrait utiliser le .replace pour enregistrer l'info comme on la veut https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp
function checkCity() {
    const city = document.getElementById("city").value;
    if (cityRegex.test(city)) {
        cityErrorMsg.innerText = "";
        return true;
    } else {
        const cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.innerText = "La ville indiquée n'est pas valide !";
        return false;
    }
};

document.getElementById("city").addEventListener("change", function (event) {
    event.preventDefault();
    checkCity();
});

//Vérification de l'email
function checkEmail() {
    const email = document.getElementById("email").value;
    if (emailRegExp.test(email)) {
        emailErrorMsg.innerText = "";
        return true;
    } else {
        const emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.innerText = `L'email renseigné n'est pas valide`;
        return false;
    }
};

document.getElementById("email").addEventListener("change", function (event) {
    event.preventDefault();
    checkEmail();
});

//Création du tableau de produits - array de strings product-ID
const order = [];

function getOrder() {
    let cart = getCart();
    for (let orderedItem of cart) {
        order.push(orderedItem.id);
    };
    return order;
};

//****************Première façon de récupérer Contact */
//Création de l'objet Contact
/*let contact = {};
function getContact() {
    contact = {
        firstname: document.getElementById("firstName").value,
        lastname: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    };
    return contact;
};

//Quand je clique sur le bouton submit, je reçois dans un tableau les id produits 
//et dans un objet les détails de contact.

document.getElementById("order").addEventListener("click", async function (event) {
    event.preventDefault();
    //Contrôle de la validité du formulaire avant envoi
    //Les produits du panier et l'objet contact à envoyer
    getContact();
    getOrder();
    const toSend = {
        order,
        contact
    };
    console.log(toSend);
    //Si le formulaire répond aux conditions de validation
    if (checkFirstName() && checkLastName() && checkAddress() && checkCity() && checkEmail()) {
        // Envoi vers le serveur
        let response = await fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toSend)
        });
        let result = await response.json();
        return alert(result.message);
    } else {
        alert("Veillez à bien remplir le formulaire !");
    };
});*/

//***********2e façon Récupération données contact formulaire via URL************** */
//****************Extraction des paramètres de l'URL ***************/
//La méthode substring permet d'isoler un élément de la chaîne récupérée, ici ?
const formInfosInURL = location.search.substring(1);
//La méthode split permet de diviser une chaîne de caractère sur un séparateur dans un tableau
const arrayContact = formInfosInURL.split("&");
const contactDetail = "";
//console.log(arrayContact);


//L'URL et particulièrement les paramètres doivent être encodés
//avant d’être transmises. La fonction encodeURI() permet de
// convertir tous les caractères spéciaux à l’exception de : , / ? :
// @ & = + $ # (Utiliser encodeURIComponent() pour encoder tout les
// caractères.)
//encodeURI("window.location.href"); pour l'envoyer en POST

//let paramOk = true;

//let param = "";
let value = "";

//function getDetail() {
// Récupération de la valeur d’une variable
// Pour créer la variable en Javascript.
for (let i = 0; i < (arrayContact.length); i++) {
    const detail = arrayContact[i];
    if (detail.substring(0, detail.indexOf("=")) == contactDetail);
    //param = detail.substring(0, detail.indexOf("="));
    value = detail.substring(detail.indexOf("=") + 1, detail.length);
    value = value.replaceAll("+", " ");
    value = value.replaceAll("%40", "@");
    // console.log(param);
    // console.log(value);
};

let contact = {};

document.getElementById("order").addEventListener("click", async function (event) {
    event.preventDefault();
    //Contrôle de la validité du formulaire avant envoi
    // Création objet Contact avec les données URL
    contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
    };
    console.log(contact);
    getOrder();
    console.log(getOrder());
    //Les produits du panier et l'objet contact à envoyer
    // const toSend = {
    //     order,
    //     contact
    // };
    //console.log(JSON.stringify(toSend));
    // console.log(toSend);
    //Si le formulaire répond aux conditions de validation
    if (checkFirstName() && checkLastName() && checkAddress() && checkCity() && checkEmail()) {
        // Envoi vers le serveur
        //console.log(toSend);
        let response = await fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: { contact, order }
        });
        let result = await response.json();
        return alert(result.message);
    } else {
        alert("Veillez à bien remplir le formulaire !");
    };
});