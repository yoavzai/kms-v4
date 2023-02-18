const { mongoose } = require('mongoose')


const LanguagesSchema = new mongoose.Schema({
  language: String,
  skill: {
    type: String,
    enum: [ 'basic', 'fluent', 'native' ],
  },
});

const UserSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    index: true,
  },
  languages: {
    type: [LanguagesSchema],
    default: [],
  },
  contacts: {
    email: String,
    phones: [String],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'ladyboy'],
  },
  someMixed: {
    type: mongoose.Schema.Types.Mixed,
    description: 'Can be any mixed type, that will be treated as JSON GraphQL Scalar Type',
  },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
    UserModel
}