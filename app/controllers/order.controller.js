const Order = require("../models/order.model");

exports.addOrder = (req, res) => {
  const newOrder = new Order({
    id: req.body.id,
    customerId: req.body.customerId,
    cart: req.body.cart, // Expecting an array of cart items
    totalCost: req.body.totalCost,
    status: req.body.status,
    machineID: req.body.machineID,
    quality: req.body.quality,
    noPackets: req.body.noPackets,
    noBoxes: req.body.noBoxes,
    feedback: req.body.feedback,
  });

  newOrder.save().then(order => {
    res.send({ message: "Order was added successfully!", order });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while saving the order." });
  });
};

exports.listAllOrders = (req, res) => {
  Order.find({}, (err, orders) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(orders);
  });
};
exports.updateOrderMachineID = (req, res) => {
  Order.findOneAndUpdate(
    { id: req.body.id }, // Query to match the order's custom 'id' attribute
    { machineID: req.body.machineID }, // Only updating the machineID
    { new: true } // This option returns the updated document
  ).then(order => {
    if (!order) {
      return res.status(404).send({ message: "Order not found!" });
    }
    res.send({ message: "Order's machine ID was updated successfully!", order });
  }).catch(err => {
    res.status(500).send({ message: err.message || "An error occurred while updating the order's machine ID." });
  });
};

exports.updateOrderStatus = (req, res) => {
  Order.findOneAndUpdate(
    { id: req.body.id }, // Query to match the order's custom 'id' attribute
    { status: req.body.status }, // Only updating the status
    { new: true } // This option returns the updated document
  ).then(order => {
    if (!order) {
      return res.status(404).send({ message: "Order not found!" });
    }
    res.send({ message: "Order status was updated successfully!", order });
  }).catch(err => {
    res.status(500).send({ message: err.message || "An error occurred while updating the order's status." });
  });
};

exports.updateOrderQuality = (req, res) => {
  Order.findOneAndUpdate(
    { id: req.body.id },
    { quality: req.body.quality },
    { new: true }
  ).then(order => {
    if (!order) {
      return res.status(404).send({ message: "Order not found!" });
    }
    res.send({ message: "Order's quality control value updated successfully!", order });
  }).catch(err => {
    res.status(500).send({ message: err.message || "An error occurred while updating the order's quality control value." });
  });
};


exports.updateOrderPackaging = (req, res) => {
  Order.findOneAndUpdate(
    { id: req.body.id },
    { noPackets: req.body.noPackets, noBoxes: req.body.noBoxes },
    { new: true }
  ).then(order => {
    if (!order) {
      return res.status(404).send({ message: "Order not found!" });
    }
    res.send({ message: "Order's packaging details updated successfully!", order });
  }).catch(err => {
    res.status(500).send({ message: err.message || "An error occurred while updating the order's packaging details." });
  });
};

exports.updateOrderFeedback = (req, res) => {
  Order.findOneAndUpdate(
    { id: req.body.id },
    { feedback: req.body.feedback },
    { new: true }
  ).then(order => {
    if (!order) {
      return res.status(404).send({ message: "Order not found!" });
    }
    res.send({ message: "Order's feedback updated successfully!", order });
  }).catch(err => {
    res.status(500).send({ message: err.message || "An error occurred while updating the order's feedback." });
  });
};

exports.deleteOrder = (req, res) => {
  Order.findOneAndRemove(
    { id: req.params.id }, // Assuming you're using a custom 'id' field
    (err, order) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!order) {
            return res.status(404).send({ message: "Order not found!" });
        }
        res.send({ message: "Order was deleted successfully!", order }); // Include the deleted order in the response
    }
  );
};
