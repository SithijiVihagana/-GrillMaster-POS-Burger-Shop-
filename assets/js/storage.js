const DB = {
  productsKey: "gm_products",
  customersKey: "gm_customers",
  ordersKey: "gm_orders"
};

function read(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
function write(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr || []));
}
function uid(prefix = "") {
  return prefix + Date.now() + Math.floor(Math.random() * 900);
}
