const { mongoose } = require("mongoose");

const ImageSchema = new mongoose.Schema({
  _id: String,
  name: String,
  bindata: Buffer,
});

const ImageModel = mongoose.model("Image", ImageSchema);

module.exports = {
  ImageModel,
};
