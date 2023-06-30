const { mongoose } = require("mongoose");

const approved_coding_template = {
  _id: String,
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
  comment: String,
  status: String,
};

const ApprovedCodingsSchema = new mongoose.Schema(approved_coding_template);

const ApprovedCodingsModel = mongoose.model(
  "Approved_Codings",
  ApprovedCodingsSchema
);

module.exports = {
  ApprovedCodingsModel,
};
