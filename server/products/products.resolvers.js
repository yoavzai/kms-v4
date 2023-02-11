const productsModel = require('./products.model')


module.exports = {
    Query: {
        products: () => {
            return productsModel.getAllProducts()
        },
        productsByPriceRange: (_, args) => {
            return productsModel.getProductsByPriceRange(args.min, args.max)
        }
    },

    Mutation : {
        addNewProduct: (_, args) => {
            return productsModel.addNewProduct(args.id, args.description, args.price)
        },
        addNewReview: (_, args) => {
            return productsModel.addNewReview(args.id, args.rating, args.comment)
        }
    }
}