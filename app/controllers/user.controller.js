const db = require("../models");
const { user: User } = db;

exports.listAllUsers = (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send(users);
    });
  };
  
exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { id: req.body.id }, // Query to match the user's custom 'id' attribute
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address
    },
    { new: true }, // This option returns the updated document
    (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      res.send({ message: "User was updated successfully!", user });
    }
  );
};

exports.deleteUser = (req, res) => {

  User.findOneAndRemove(
      { id: req.params.userId }, 
      (err, product) => {
          if (err) {
              res.status(500).send({ message: err });
              return;
          }
          if (!product) {
              return res.status(404).send({ message: "User not found!" });
          }
          res.send({ message: "User was deleted successfully!", product }); // Include the deleted product in the response
      }
  );
};