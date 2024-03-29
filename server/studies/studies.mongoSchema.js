const { mongoose } = require('mongoose');
const { field_template } = require('./../fields/fields.mongoSchema');


const StudySchema = new mongoose.Schema({
  _id: String,
  creator_id: String,
  study_details: [field_template],
  individual_details: [field_template],
  questionnaire_details: [field_template],
  custom_templates: [{_id: String, name: String, language: String, inputs: [{input_id: Number, name: String}]}],
  date_created: Date,
  date_updated: Date,
  is_deleted: Boolean
})

const StudyModel = mongoose.model('Study', StudySchema);

module.exports = {
  StudyModel
}