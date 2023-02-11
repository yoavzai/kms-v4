const productsModel = require('./products.model')


module.exports = {
    Query: {
        products: () => productsModel.getAllProducts(),
        productsByPriceRange: (_, args) => productsModel.getProductsByPriceRange(args.min, args.max)
    },

    Mutation : {
        addNewProduct: (_, args) => productsModel.addNewProduct(args.id, args.description, args.price),
        addNewReview: (_, args) => productsModel.addNewReview(args.id, args.rating, args.comment)
    }
}
