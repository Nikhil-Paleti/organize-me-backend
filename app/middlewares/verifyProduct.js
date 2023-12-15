const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Product = db.product;

checkDuplicateProductIdOrName = (req, res, next) => {
    // Check for duplicate ID
    Product.findOne({
        id: req.body.id
    }).exec((err, product) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (product) {
            res.status(400).send({ message: "Failed! Product ID is already in use!" });
            return;
        }

        // Check for duplicate Name
        Product.findOne({
            name: req.body.name
        }).exec((err, product) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (product) {
                res.status(400).send({ message: "Failed! Product Name is already in use!" });
                return;
            }

            next();
        });
    });
};


const verifyProduct = {
    checkDuplicateProductIdOrName
};

module.exports = verifyProduct;
