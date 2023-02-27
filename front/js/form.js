import { getCart } from "./cart.js";
//*****************************FORMULAIRE******************************** */

//****************Manière de faire sans utiliser l'URL *************/

// //Ajout de placeholders dans les champs du formulaire
// document.getElementById("firstName").placeholder = "Perrine";
// document.getElementById("lastName").placeholder = "Duval";
// document.getElementById("address").placeholder = "3 passage des prés";
// document.getElementById("city").placeholder = "35000 Rennes";
// document.getElementById("email").placeholder = "perrine.duval@gmail.com";

// //Les RegExp
// const namesRegex = /[A-Za-z\-\s*]+/;
// const addressRegex = /([0-9\,]{1,3})\s*([A-Za-z\-\,\s*]+)/;
// const cityRegex = /([A-Za-z-\s*]+)\s*([0-9]{5})/;
// const emailRegExp = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Vérification du prénom
// function checkFirstName() {
//     const firstName = document.getElementById("firstName").value;
//     if (namesRegex.test(firstName)) {
//         firstNameErrorMsg.innerText = "";
//         return true;
//     } else {
//         const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
//         firstNameErrorMsg.innerText = "Le prénom renseigné n'est pas valide !";
//         return false;
//     }
// };

// document.getElementById("firstName").addEventListener("change", function (event) {
//     event.preventDefault();
//     checkFirstName();
// });

// //Vérification du nom
// function checkLastName() {
//     const lastName = document.getElementById("lastName").value;
//     if (namesRegex.test(lastName)) {
//         lastNameErrorMsg.innerText = "";
//         return true;
//     } else {
//         const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
//         lastNameErrorMsg.innerText = "Le nom renseigné n'est pas valide !";
//         return false;
//     }
// };

// document.getElementById("lastName").addEventListener("change", function (event) {
//     event.preventDefault();
//     checkLastName();
// });

// //Vérification de l'adresse
// function checkAddress() {
//     const address = document.getElementById("address").value;
//     if (addressRegex.test(address)) {
//         addressErrorMsg.innerText = "";
//         return true;
//     } else {
//         const addressErrorMsg = document.getElementById("addressErrorMsg");
//         addressErrorMsg.innerText = `L'adresse renseignée n'est pas valide`;
//         return false;
//     }
// };

// document.getElementById("address").addEventListener("change", function (event) {
//     event.preventDefault();
//     checkAddress();
// });

// //Vérification de la ville

// //On pourrait utiliser le .replace pour enregistrer l'info comme on la veut https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp
// function checkCity() {
//     const city = document.getElementById("city").value;
//     if (cityRegex.test(city)) {
//         cityErrorMsg.innerText = "";
//         return true;
//     } else {
//         const cityErrorMsg = document.getElementById("cityErrorMsg");
//         cityErrorMsg.innerText = "La ville indiquée n'est pas valide !";
//         return false;
//     }
// };

// document.getElementById("city").addEventListener("change", function (event) {
//     event.preventDefault();
//     checkCity();
// });

// //Vérification de l'email
// function checkEmail() {
//     const email = document.getElementById("email").value;
//     if (emailRegExp.test(email)) {
//         emailErrorMsg.innerText = "";
//         return true;
//     } else {
//         const emailErrorMsg = document.getElementById("emailErrorMsg");
//         emailErrorMsg.innerText = `L'email renseigné n'est pas valide`;
//         return false;
//     }
// };

// document.getElementById("email").addEventListener("change", function (event) {
//     event.preventDefault();
//     checkEmail();
// });

// //Création du tableau de produits - array de strings product-ID
// //En supprimant les doublons pour l'appel à l'API
// const orderIds = [];
// let order = [];

// function getOrder() {
//     let cart = getCart();
//     for (let item of cart) {
//         orderIds.push(item.id);
//         order = orderIds.filter((x, i) => orderIds.indexOf(x) === i);
//     };
//     return order;
// };
// getOrder();

// //****************Première façon de récupérer Contact */
// //Création de l'objet Contact
// let contact = {};
// function getContact() {
//     contact = {
//         firstname: document.getElementById("firstName").value,
//         lastname: document.getElementById("lastName").value,
//         address: document.getElementById("address").value,
//         city: document.getElementById("city").value,
//         email: document.getElementById("email").value
//     };
//     return contact;
// };

// //Quand je clique sur le bouton submit, je reçois dans un tableau les id produits 
// //et dans un objet les détails de contact.

// document.getElementById("order").addEventListener("click", async function (event) {
//     event.preventDefault();
//     //Contrôle de la validité du formulaire avant envoi
//     //Les produits du panier et l'objet contact à envoyer
//     getContact();
//     getOrder();
//     const toSend = {
//         order,
//         contact
//     };
//     console.log(toSend);
//     //Si le formulaire répond aux conditions de validation
//     if (checkFirstName() && checkLastName() && checkAddress() && checkCity() && checkEmail()) {
//         // Envoi vers le serveur
//         let response = await fetch("http://localhost:3000/api/products/order", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(toSend)
//         });
//         let result = await response.json();
//         return alert(result.message);
//     } else {
//         alert("Veillez à bien remplir le formulaire !");
//     };
// });

/***************************************************************** */
/***************************************************************** */
/***************************************************************** */
//***********2e façon Récupération données contact formulaire via URL************** */
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
//En supprimant les doublons pour l'appel à l'API
//const orderIds = [];
let products = [];

function getOrder() {
    let cart = getCart();
    for (let item of cart) {
        products.push(item.id);//ordersIds à la place d'order si on ne veut pas de répétition d'id
        //order = orderIds.filter((x, i) => orderIds.indexOf(x) === i);
    };
    return products;
};
getOrder();

//****************Extraction des paramètres de l'URL ***************/
//La méthode substring permet d'isoler un élément de la chaîne récupérée, ici ?
const formInfosInURL = location.search.substring(1);
//La méthode split permet de diviser une chaîne de caractère sur un séparateur dans un tableau
let arrayContact = formInfosInURL.split("&");

//Il ne reste qu’à isoler le nom du paramètre ou de la variable avec sa 
//valeur. Pour ce faire il faut utiliser la méthode " substring " jumelé 
//avec la méthode " indexOf " qui permet de donner la position d’un 
//caractère dans une chaîne de caractères.

function getContactDetail(i) {
    let detailValue = arrayContact[i].substring(arrayContact[i].indexOf("=") + 1, arrayContact[i].length);
    detailValue = detailValue.replaceAll("+", " ");
    detailValue = detailValue.replaceAll("%40", "@");
    return detailValue;
};

let contact = {
    firstName: getContactDetail(0),
    lastName: getContactDetail(1),
    address: getContactDetail(2),
    city: getContactDetail(3),
    email: getContactDetail(4),
};

document.getElementById("order").addEventListener("click", async function (event) {
    event.preventDefault();
    //Si le formulaire répond aux conditions de validation
    if (checkFirstName() && checkLastName() && checkAddress() && checkCity() && checkEmail()) {
        // Envoi vers le serveur
        await fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ contact, products }),
        })
            .then(response => {
                return response.json();
            })
            .then(body => {
                console.log(body.orderId);
                document.location.href = ("href", `./confirmation.html?order=${body.orderId}`);
            });
    } else {
        alert("Veillez à bien remplir le formulaire !");
    };
});