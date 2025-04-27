const mongoose = require('mongoose');
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'worker'],
    default: 'user'
  }
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;
