const { mongoose } = require('mongoose');


const field_template = {
  type: {
    type: String,
    enum: ["text", "number", "date", "dropdown", "slider"],
    required: true
  },
  key: {
    type: String,
    required: true
  },
  mandatory: Boolean,
  value: String,
  min_num: String,
  max_num: String,
  dropdown_options: {
    type: [String],
    default: undefined
  },
  _id: false
}

const FieldsSchema = new mongoose.Schema({
  _id: String,
  name: String,
  fields: [field_template],
})

const FieldsModel = mongoose.model('Fields', FieldsSchema);

module.exports = {
  FieldsModel,
  field_template
}