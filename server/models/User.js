const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

// Instance methods (user)
UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  try {
    const token = jwt
      .sign({ _id: user._id }, process.env.JWT_SECRET)
      .toString();
    user.authTokens.push(token);
    await user.save();
    return token;
  } catch (error) {
    return Promise.reject(error);
  }
};

UserSchema.methods.removeToken = async function(token) {
  const user = this;
  try {
    return user.update({ $pull: { authTokens: token } });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Static methods (User)
UserSchema.statics.findByToken = async function(token) {
  const User = this;
  try {
    const decodedId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodedId, authTokens: token });
    if (!user) {
      throw new Error('No user with given token');
    }
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

UserSchema.statics.findByCredentials = async function(email, password) {
  const User = this;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('No user by that email');
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      return user;
    } else {
      throw new Error('Incorrect password');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

// Pre save, hash password
UserSchema.pre('save', function(next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
