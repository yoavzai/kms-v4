const { mongoose } = require('mongoose')


const UserSchema = new mongoose.Schema({
  _id: String,
  username: String,
  passhash: String,
  email: String,
  first_name: String,
  last_name: String,
  role: {
    type: String,
    enum: ['admin', 'student', 'guest'],
  } ,
  date_created: Date,
  date_updated: Date,
  is_deleted: Boolean
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
    UserModel
}