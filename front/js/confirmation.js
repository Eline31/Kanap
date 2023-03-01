const orderInURL = location.search.substring(1);

const orderId = document.getElementById("orderId");
orderId.innerText = getOrderId();

/**Fonction de récupération de l'order-Id dans l'URL */
function getOrderId() {
    orderNumber = orderInURL.substring(orderInURL.indexOf("=") + 1);
    return orderNumber;
};
getOrderId();