const controller = require("../controllers/order.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.post("/api/orders/add", controller.addOrder);

    // app.put("/api/orders/update", controller.updateOrder);

    app.put("/api/orders/updateMachineID", controller.updateOrderMachineID);
    
    app.put("/api/orders/updateStatus", controller.updateOrderStatus);

    app.put("/api/orders/updateQuality", controller.updateOrderQuality);

    app.put("/api/orders/updatePackaging", controller.updateOrderPackaging);

    app.put("/api/orders/updateFeedback", controller.updateOrderFeedback);

    app.get("/api/orders/list", controller.listAllOrders);

    app.delete("/api/orders/:orderId", controller.deleteOrder);

}