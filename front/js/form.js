import { getCartFromLocalStorage } from "./services/localstorage.service.js";
import { sendOrderAPI } from "./services/fetch-api.service.js";
//*****************************FORMULAIRE******************************** */

const firstNameInput = document.getElementById("firstName")
const lastNameInput = document.getElementById("lastName")
const addressInput = document.getElementById("address")
const cityInput = document.getElementById("city")
const emailInput = document.getElementById("email")

/**Ajout de placeholders dans les champs du formulaire */
firstNameInput.placeholder = "Perrine";
document.getElementById("lastName").placeholder = "Duval";
document.getElementById("address").placeholder = "3 passage des prés";
document.getElementById("city").placeholder = "Rennes";
document.getElementById("email").placeholder = "perrine.duval@gmail.com";

/**Déclaration des expressions régulières */
const namesRegex = /[A-Za-z\s*]{3,30}[ ]{0,1}[-]{0,1}[A-Za-z\s*]{0,30}/;
const addressRegex = /([0-9\,]{1,3})\s*([A-Za-z\-\,\s*]+)/;
const cityRegex = /([A-Za-z-\s*]+)/;
const emailRegExp = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/** Fonction de vérification du prénom */
function checkFirstName() {
    const firstName = firstNameInput.value;
    if (namesRegex.test(firstName)) {
        firstNameErrorMsg.innerText = "";
        return true;
    } else {
        const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerText = "Le prénom renseigné n'est pas valide !";
        return false;
    }
};

/** Ajout de l'eventListener pour activer la vérification */
firstNameInput.addEventListener("change", function (event) {
    event.preventDefault();
    checkFirstName();
});

/** Fonction de vérification du nom */
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

/** Ajout de l'eventListener pour activer la vérification */
document.getElementById("lastName").addEventListener("change", function (event) {
    event.preventDefault();
    checkLastName();
});

/** Fonction de vérification de l'adresse */
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

/** Ajout de l'eventListener pour activer la vérification */
document.getElementById("address").addEventListener("change", function (event) {
    event.preventDefault();
    checkAddress();
});

/** Fonction de vérification de la ville */
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

/** Ajout de l'eventListener pour activer la vérification */
document.getElementById("city").addEventListener("change", function (event) {
    event.preventDefault();
    checkCity();
});

/** Fonction de vérification de l'email */
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

/** Ajout de l'eventListener pour activer la vérification */
document.getElementById("email").addEventListener("change", function (event) {
    event.preventDefault();
    checkEmail();
});

/**Fonction de récupération des id des produits du panier pour créer le tableau products à envoyer à l'API */
function getOrder() {
    let cart = getCartFromLocalStorage();

    return cart.map((item) => item.id);
};

//****************Extraction des paramètres de l'URL ***************/

//Il ne reste qu’à isoler le nom du paramètre ou de la variable avec sa 
//valeur. Pour ce faire il faut utiliser la méthode " substring " jumelé 
//avec la méthode " indexOf " qui permet de donner la position d’un 
//caractère dans une chaîne de caractères.

/**Fonction de récupération des données du formulaire dans l'URL */
function getContactDetail(i) {
    let detailValue = arrayContact[i].substring(arrayContact[i].indexOf("=") + 1, arrayContact[i].length);
    detailValue = detailValue.replaceAll("+", " ");
    detailValue = detailValue.replaceAll("%40", "@");
    return detailValue;
};

function getContact() {
        return {
            firstName: firstNameInput.value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
        };
    };

/**Ajout de l'eventlistener "submit" pour la vérification des champs du formulaire puis l'envoi du tableau products et de l'objet contact à l'API */
document.getElementById("order").closest("form").addEventListener("submit", function (event) {
    event.preventDefault();
    //Si le formulaire répond aux conditions de validation
    if (checkFirstName() && checkLastName() && checkAddress() && checkCity() && checkEmail()) {
        sendOrderAPI(getContact(), getOrder());
    } else {
        alert("Veillez à bien remplir le formulaire !");
    };
});