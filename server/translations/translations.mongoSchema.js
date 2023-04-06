const { mongoose } = require('mongoose')


const TranslationSchema = new mongoose.Schema({
  _id: String,
  "input_id": Number,
  "language": String,
  "value": String
});

const TranslationModel = mongoose.model('Translation', TranslationSchema);

module.exports = {
  TranslationModel
}