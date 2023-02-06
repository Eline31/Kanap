const price = product.price.toFixed(2);

function cartItemDetails(product) {
    const cartContent = document.getElementById("cart__items");
    const cartItem = document.createElement("article");
    cartItem.classList.add("cart__item");

    const itemImg = document.createElement("div");
    itemImg.classList.add("cart__item__img");

    const imageElement = document.createElement("img");
    imageElement.src = product.imageUrl
    imageElement.alt = product.altTxt;

    cartItem.appendChild(cartItemImg);
    cartItemImg.appendChild(imageElement);

    const itemContent = document.createElement("div");
    itemContent.classList.add("cart__item__content");

    cartItem.appendChild(itemContent);

    const itemDescription = document.createElement("div");
    itemDescription.classList.add("cart__item__content__description");

    itemContent.appendChild(itemDescription);

    const itemName = document.createElement("h2");
    itemName.innerText = product.name;
    const itemColor = document.createElement("p");
    itemColor.innterText = product.color; //à définir !! pas encore défini
    const itemPrice = document.createElement("p");
    const price = product.price.toFixed(2);
    itemPrice.innterText = `${price} €`;

    itemDescription.appendChild(itemName);
    itemDescription.appendChild(itemColor);
    itemDescription.appendChild(itemPrice);

    const itemContentSettings = document.createElement("div");
    itemContentSettings.classList.add("cart__item__content__settings");

    itemContent.appendChild(itemContentSettings);

    const contentQuantity = document.createElement("div");
    contentQuantity.classList.add("cart__item__content__settings__quantity");

    itemContentSettings.appendChild(contentQuantity);

    const quantity = document.createElement("p");
    quantity.innerText = "Qté :";
    const itemQuantity = document.createElement("input");
    itemQuantity.type = "number";
    itemQuantity.classList.add("itemQuantity");
    itemQuantity.min = "1";
    itemQuantity.max = "100";
    itemQuantity.value = "42";

    contentQuantity.appendChild(quantity);
    contentQuantity.appendChild(itemQuantity);

    const contentDelete = document.createElement("div");
    contentDelete.classList.add("cart__item__content__settings__delete");

    itemContentSettings.appendChild(contentDelete);

    const deleteItem = document.createElement("p");
    deleteItem.classList.add("deleteItem");
    deleteItem = "Supprimer";

    contentDelete.appendChild(deleteItem);
};

async function addedItem() {
    const result = await fetch(`http://localhost:3000/api/products/${productId}`);
    const product = await result.json();

    cartItemDetails(product);
};