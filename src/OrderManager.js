/**
 * @fileoverview OrderManager, this component manage the orders.
 * @version 1.0
 * @author Carlos Cabezas Fallas
 * @author Denilson Granados Solano
 * @author Jahel Jiménez Porras
 * @author Jonathan Orozco Pérez
 * @author María Ramírez Hernández
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of OrderManager page was written by Carlos Cabezas, Denilson Granados,
 * Jahel Jiménez, Jonathan Orozco, María Ramírez.
 */
const defaultOrderIndex = "orders";

function getOrder(id) {
  let orders = localStorage.getItem(id);

  if (orders) {
    return JSON.parse(orders);
  } else {
    return null;
  }
}

// This method is responsible for obtaining the orders made by each user.
function getAllOrders() {
  let temp = new Map();

  for (var i = 0; i < localStorage.length; i++) {
    // set iteration key name
    var key = localStorage.key(i);

    // use key name to retrieve the corresponding value
    var value = localStorage.getItem(key);

    // set the iteration key and value
    temp.set(key, value);
  }
  return temp;
}

function addSubscription(province, canton) {
  let subscriptions = localStorage.getItem("subscriptions");
  if (subscriptions) {
    subscriptions = JSON.parse(subscriptions);
    if (subscriptions[province]) {
      if (!subscriptions[province].includes(canton)) {
        subscriptions[province].push(canton);
      }
    } else {
      subscriptions[province] = [canton];
    }
    subscriptions = JSON.stringify(subscriptions);
    localStorage.setItem("subscriptions", subscriptions);
  } else {
    subscriptions = { [province]: [canton] };
    subscriptions = JSON.stringify(subscriptions);
    localStorage.setItem("subscriptions", subscriptions);
  }
}

// This method is responsible for adding an order to the local storage.
function addOrder(id, newOrder) {
  localStorage.setItem(id, JSON.stringify(newOrder));
}

function deleteSubscription(province, canton) {
  let subscriptions = localStorage.getItem("subscriptions");
  if (subscriptions) {
    subscriptions = JSON.parse(subscriptions);
    if (subscriptions[province]) {
      let index = subscriptions[province].indexOf(canton);
      if (index > -1) {
        subscriptions[province].splice(index, 1);
      }
      subscriptions = JSON.stringify(subscriptions);
      localStorage.setItem("subscriptions", subscriptions);
    }
  }
}

// This method is responsible for delete an order to the local storage.
function deleteOrder(id) {
  localStorage.removeItem(id);
}

// This method is responsible for delete all orders to the local storage.
 function deleteAllOrders() {
  localStorage.clear();
}

export { getOrder, addOrder, deleteOrder,deleteAllOrders, getAllOrders };
