var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }
  password: {
    type: String,
    required: true
  }
  salt: {
    type: String
  }
})




var UserModel = new Schema('UserModel', UserSchema)

module.exports = {
  UserModel: UserModel
}