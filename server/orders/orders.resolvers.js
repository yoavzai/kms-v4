const ordersModel = require('./orders.model')


module.exports = {
    Query: {
        orders: () => ordersModel.getAllOrders(),
        orderById: (_, args) => ordersModel.getOrderById(args.id)
    }
}
