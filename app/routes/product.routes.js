const controller = require("../controllers/product.controller");
const {verifyProduct} = require("../middlewares")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Route to add a new product
  app.post("/api/products/add", 
  [
    verifyProduct.checkDuplicateProductIdOrName
  ],
  controller.addProduct);

  // Route to delete a product by ID
  app.delete("/api/products/:productId", controller.deleteProduct);

  // Route to update a product by ID
  app.put("/api/products/update", controller.updateProduct);

  app.get("/api/products/list", controller.listAllProducts);
};
