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
  return products.filter(p => {
    return p.price >= min && p.price <= max
  })
}

function addNewProduct(id, description, price) {
  const newProduct = {
    id: id,
    description: description,
    price: price,
    reviews: []
  }
  products.push(newProduct)
  return newProduct
}

function addNewReview(id, rating, comment) {
  const product = products.find(p => p.id === id)
  if (product) {
    const review = {
      rating: rating,
      comment: comment
    }
    product.reviews.push(review)
    return review
  }
  else {
    return null
  }
}

module.exports = {
  getAllProducts,
  getProductsByPriceRange,
  addNewProduct,
  addNewReview,
}