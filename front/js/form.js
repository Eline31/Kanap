import { getCartFromLocalStorage } from "./services/localstorage.service.js";
import { sendOrderAPI } from "./services/fetch-api.service.js";

/*****************************FORMULAIRE******************************** */

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");

/**Ajout de placeholders dans les champs du formulaire */
firstNameInput.placeholder = "Perrine";
lastNameInput.placeholder = "Duval";
addressInput.placeholder = "3 passage des prés";
cityInput.placeholder = "Rennes";
emailInput.placeholder = "perrine.duval@gmail.com";

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
    const lastName = lastNameInput.value;
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
lastNameInput.addEventListener("change", function (event) {
    event.preventDefault();
    checkLastName();
});

/** Fonction de vérification de l'adresse */
function checkAddress() {
    const address = addressInput.value;
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
addressInput.addEventListener("change", function (event) {
    event.preventDefault();
    checkAddress();
});

/** Fonction de vérification de la ville */
function checkCity() {
    const city = cityInput.value;
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
cityInput.addEventListener("change", function (event) {
    event.preventDefault();
    checkCity();
});

/** Fonction de vérification de l'email */
function checkEmail() {
    const email = emailInput.value;
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
emailInput.addEventListener("change", function (event) {
    event.preventDefault();
    checkEmail();
});

/**Fonction de récupération des id des produits du panier pour créer le tableau products à envoyer à l'API */
function getOrder() {
    let cart = getCartFromLocalStorage();

    return cart.map((item) => item.id);
};

function getContact() {
    return {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value
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