const http = require("http");
const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");
const port = 8000;

const server = http.createServer((req, res) => {
  // get all
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  }
  // get single product
  else if (req.url.match(/\/api\/product\/([0-9]+)/) && req.method === "GET") {
    getSingleProduct(req, res);
  }
  // update product
  else if (req.url.match(/\/api\/product\/([0-9]+)/) && req.method === "PUT") {
    updateProduct(req, res);
  }
  // delete product
  else if (
    req.url.match(/\/api\/product\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    deleteProduct(req, res);
  }
  //  create product
  else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);
  }
  //all other routes
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Route not Found");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
