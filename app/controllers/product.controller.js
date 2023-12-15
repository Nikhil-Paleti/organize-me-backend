const Product = require("../models/product.model"); // Assuming this is your product model

exports.addProduct = (req, res) => {
  const newProduct = new Product({
    id: req.body.id,
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    cost: req.body.cost,
    quantity: req.body.quantity
  });

  newProduct.save((err, product) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Product was added successfully!", product });
  });
};

exports.deleteProduct = (req, res) => {
  Product.findOneAndRemove(
      { id: req.params.productId }, // Make sure this matches your database schema. If you're using MongoDB's default '_id', it should be { _id: req.params.productId }
      (err, product) => {
          if (err) {
              res.status(500).send({ message: err });
              return;
          }
          if (!product) {
              return res.status(404).send({ message: "Product not found!" });
          }
          res.send({ message: "Product was deleted successfully!", product }); // Include the deleted product in the response
      }
  );
};

exports.updateProduct = (req, res) => {
    Product.findOneAndUpdate(
        { id: req.body.id }, // Query to match the custom 'id' attribute
        {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            cost: req.body.cost,
            quantity: req.body.quantity
        },
        { new: true }, // This returns the updated document
        (err, product) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!product) {
                return res.status(404).send({ message: "Product not found!" });
            }
            res.send({ message: "Product was updated successfully!", product });
        }
    );
};
  
exports.listAllProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(products);
  });
};