const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  authTokens: [String],
  linkedIn: {
    toggleStatus: Boolean,
    access_token: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
