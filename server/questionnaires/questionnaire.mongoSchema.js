const { mongoose } = require("mongoose");
const {
  coding_template,
} = require("../approved_codings/approved_codings.mongoSchema");
const { field_template } = require("../fields/fields.mongoSchema");

const input_template = {
  _id: false,
  input_id: Number,
  name: String,
  answer: {
    text: String,
    image_id: String,
    codings: [coding_template],
  },
};

const QuestionnaireSchema = new mongoose.Schema({
  _id: String,
  study_id: String,
  individual_details: [field_template],
  questionnaire_details: [field_template],
  inputs: [input_template],
  date_created: Date,
  date_updated: Date,
  is_deleted: Boolean,
});

const QuestionnaireModel = mongoose.model("Questionnaire", QuestionnaireSchema);

module.exports = {
  QuestionnaireModel,
  input_template,
};
