require('dotenv').config();
const { mongoose } = require('./mongoose.js');
const { User } = require('./../models/User');

const exampleUsers = [
  {
    email: 'MargaretBananaDev@gmail.com',
    password: 'teambanana7'
  },
  {
    email: 'JanetBananaDev@outlook.com',
    password: 'teambanana7'
  }
];

const populateUsers = async (users) => {
  try {
    const result = await User.create(users);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

populateUsers(exampleUsers);
