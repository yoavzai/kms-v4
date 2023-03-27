const { mongoose } = require('mongoose')


const TemplateSchema = new mongoose.Schema({
  name: String,
  inputs_ids: [Number]
});

const TemplateModel = mongoose.model('Template', TemplateSchema);

module.exports = {
  TemplateModel
}