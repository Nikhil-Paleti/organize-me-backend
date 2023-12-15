const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

var isRole = (requiredRoles) => {
  return (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          const userRoles = roles.map(role => role.name);
          const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

          if (hasRequiredRole) {
            next();
            return;
          }

          res.status(403).send({ message: "Access denied: You do not have the required role!" });
        }
      );
    });
  };
};

const isAdmin = isRole(["admin"]);
const isCEO = isRole(["ceo"]);
const isManager = isRole(["manager"]);
const isProduction = isRole(["production"]);
const isQC = isRole(["qc"]);
const isUser = isRole(["user"]);


const authJwt = {
  verifyToken,
  isAdmin,
  isCEO,
  isManager,
  isProduction,
  isQC,
  isUser
};

module.exports = authJwt;
