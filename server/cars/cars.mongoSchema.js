const { mongoose } = require('mongoose')


const EngineSchema = new mongoose.Schema({
    name: String,
    year: Date,
    volume: Number
  });
  
  const CarSchema = new mongoose.Schema({
    brand: String,
    year: Date,
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