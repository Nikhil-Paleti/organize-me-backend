const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.product = require("./product.model")

db.refreshToken = require("./refreshToken.model");

db.ROLES = ["user", "ceo", "manager", "admin", "production", "qc"];

module.exports = db;