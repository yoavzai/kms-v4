const { mongoose } = require('mongoose')


const TranslationSchema = new mongoose.Schema({
  "input_id": Number,
  "language": String,
  "value": String
});

const TranslationModel = mongoose.model('Translation', TranslationSchema);

module.exports = {
  TranslationModel
}