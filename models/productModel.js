const products = require("../data/projects.json");
const { writeToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}
function findById(id) {
  return new Promise((resolve, reject) => {
    resolve(products.find((item) => item.id === id));
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: products.length + 1, ...product };
    products.push(newProduct);
    writeToFile("./data/projects.json", products);
    resolve(newProduct);
  });
}

function update(id, productData) {
  return new Promise((resolve, reject) => {
    const productToUpdate = products.findIndex((p) => p.id === id);
    products[productToUpdate] = { id, ...productData };
    writeToFile("./data/projects.json", products);
    resolve(products[productToUpdate]);
  });
}

function deleteProductByID(id) {
  return new Promise((resolve, reject) => {
    const updatedProducts = products.filter((item) => item.id !== id);
    writeToFile("./data/projects.json", updatedProducts);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteProductByID,
};
