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
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/product\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    getSingleProduct(req, res);
  } else if (
    req.url.match(/\/api\/product\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    updateProduct(req, res);
  } else if (
    req.url.match(/\/api\/product\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    deleteProduct(req, res);
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Route not Found");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
