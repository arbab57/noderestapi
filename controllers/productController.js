const Products = require("../models/productModel");
const { getPostData } = require("../utils");

//get all products
// GET /api/products

async function getProducts(req, res) {
  try {
    const products = await Products.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(products));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

//get single products
// GET /api/product/:id

async function getSingleProduct(req, res) {
  try {
    let id;
    id = Number(req.url.split("/").pop());
    const product = await Products.findById(id);
    if (product) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(product));
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "text-plain" });
      res.write(JSON.stringify("Product not found"));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}

//create product
// POST /api/products

async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);
    const product = {
      title,
      description,
      price,
    };

    const newProduct1 = await Products.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.write("Product created " + JSON.stringify(newProduct1));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

//update product
// PUT /api/product/:id

async function updateProduct(req, res) {
  try {
    let id;
    id = Number(req.url.split("/").pop());
    const product = await Products.findById(id);
    if (product) {
      const body = await getPostData(req);
      const { title, description, price } = JSON.parse(body);

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updProduct1 = await Products.update(id, productData);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write("Product updated " + JSON.stringify(updProduct1));
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "text-plain" });
      res.write(JSON.stringify("Product not found"));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}

//delete product
// PUT /api/product/:id

async function deleteProduct(req, res) {
  try {
    let id;
    id = Number(req.url.split("/").pop());
    const product = await Products.findById(id);
    if (product) {
      await Products.deleteProductByID(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(`Product ${id} removed`));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify("product not found"));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
