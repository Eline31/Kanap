const orderInURL = location.search.substring(1);
console.log(orderInURL);

const orderId = document.getElementById("orderId");
orderId.innerText = getOrderId();

function getOrderId() {
    orderNumber = orderInURL.substring(orderInURL.indexOf("=") + 1);
    return orderNumber;
};
getOrderId();