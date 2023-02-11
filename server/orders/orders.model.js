const orders = [
    {
        id: "1",
        date: "2005-05-05",
        subtotal: 88.88,
        items: [
        {
            product:
            {
            id: "1",
            descirption: "Old TV",
            price: 44.44
            },
            quantity: 2
        }
        ]
    },
    {
        id: "2",
        date: "2005-05-05",
        subtotal: 121.22,
        items: [
        {
            product:
            {
            id: "2",
            descirption: "Old Guitar",
            price: 121.22
            },
            quantity: 1
        }
        ]
    }
]

function getAllOrders() {
    return orders
}

function getOrderById(id) {
    return orders.find(o => o.id === id)
}

module.exports = {
    getAllOrders,
    getOrderById,
}