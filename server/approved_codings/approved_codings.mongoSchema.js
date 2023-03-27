const { mongoose } = require('mongoose');


const coding_template = {
  referent: String,
  meaning_value: String,
  sr: String,
  reflvl: String,
  dim: String,
  tr: String,
  fr: String,
  fe: String,
  ss: String,
  mm: String,
  comment: String
}

const ApprovedCodingsSchema = new mongoose.Schema(coding_template)

const ApprovedCodingsModel = mongoose.model('Approved_Codings', ApprovedCodingsSchema);

module.exports = {
  ApprovedCodingsModel,
  coding_template
}