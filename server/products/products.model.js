const products = [
  {
    id: "1",
    description: "TV",
    price: 44.44,
    reviews: [
      {
        rating: 8,
        comment: "Great"
      },
      {
        rating: 7,
        comment: "OK"
      }
    ]
  },
  {
    id: "2",
    description: "Guitar",
    price: 121.22,
    reviews: [
      {
        rating: 5,
        comment: "Bad"
      }
    ]
  }
]

function getAllProducts() {
  return products
}

function getProductsByPriceRange(min, max) {
  return products.filter(({price}) => price >= min && price <= max)
}

function addNewProduct(id, description, price) {
  const newProduct = {
    id,
    description,
    price,
    reviews: []
  }
  products.push(newProduct)
  return newProduct
}

function addNewReview(id, rating, comment) {
  const product = products.find(p => p.id === id)
  if (product) {
    const review = { rating, comment }
    product.reviews.push(review)
    return review
  }
  return null
}

module.exports = {
  getAllProducts,
  getProductsByPriceRange,
  addNewProduct,
  addNewReview,
}
