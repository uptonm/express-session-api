const mongoose = require('mongoose');
const { Schema } = mongoose;

const userModel = new Schema({
  first: String,
  last: String,
  email: String,
  googleId: String
});

const User = mongoose.model('users', userModel);
module.exports = User;
