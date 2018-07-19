require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;

const { mongoose } = require('./../mongoose');
const { User } = require('./../../models/User');

const margaretId = new ObjectId();
const margaret = {
  _id: margaretId,
  email: 'margaretbananadev@gmail.com',
  password: process.env.MARGARET_PASSWORD,
  authTokens: [
    jwt.sign({ _id: margaretId }, process.env.JWT_SECRET).toString()
  ],
  linkedIn: {
    access_token: process.env.MARGARET_LINKEDIN_ACCESS_TOKEN
  }
};

const populateConnectedUsers = async () => {
  try {
    await User.remove({});
    const newUser = await User.create(margaret);
    console.log(`Seeded user: ${newUser.email}`);
    return Promise.resolve(newUser);
  } catch (error) {
    console.log(error);
    return Promise.reject(newUser);
  }
};

// populateConnectedUsers();

module.exports = { margaret };
