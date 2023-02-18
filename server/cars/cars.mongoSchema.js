const { mongoose } = require('mongoose')


const EngineSchema = new mongoose.Schema({
    name: String,
    year: Number,
    volume: Number
  });
  
  const CarSchema = new mongoose.Schema({
    brand: String,
    year: Number,
    engines: {
      type: [EngineSchema],
      default: [],
    },
    wheels: {
      name: String,
      sizes: [Number],
    },
  });

const CarModel = mongoose.model('Car', CarSchema);

module.exports = {
    CarModel
}