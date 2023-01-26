//Récupération des produits de l'API
/*await - mais pas de fonction async - dois-je rajouter un .then pour la promise ?*/
const response = await fetch("http://localhost:3000/api/products/");
const productCards = await response.json();

//Il faut dessérialiser le JSON renvoyé dans la réponse.

//Créer une fonction displayProductCards pour afficher toutes les cartes
// Elle doit appeler productCards à l'intérieur avec une boucle for
// Elle doit récupérer l'élément avec l'id items dans index.html pour pouvoir insérer les productCards à l'intérieur

//Créer une fonction productCard pour en afficher une