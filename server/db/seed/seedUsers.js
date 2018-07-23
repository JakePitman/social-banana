require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;

const { mongoose } = require('./../mongoose');
const { User } = require('./../../models/User');

const margaretId = new ObjectId();
const users = [
  {
    _id: margaretId,
    email: 'margaretbananadev@gmail.com',
    name: 'Margaret',
    company: 'Banana Factory',
    phone: '0425666245',
    password: process.env.MARGARET_PASSWORD,
    authTokens: [
      jwt.sign({ _id: margaretId }, process.env.JWT_SECRET).toString()
    ],
    linkedIn: {
      toggleStatus: true,
      access_token: process.env.MARGARET_LINKEDIN_ACCESS_TOKEN
    }
  },
  {
    email: 'maybananadev@outlook.com',
    name: 'Janet',
    company: 'Banana Factory',
    phone: '042512341234',
    password: process.env.MARGARET_PASSWORD
  },
  {
    email: 'june@email.com',
    name: 'June',
    company: 'Banana Factory',
    phone: '042598769876',
    password: process.env.MARGARET_PASSWORD
  }
];

const populateConnectedUsers = async () => {
  try {
    await User.remove({});
    const newUsers = await User.create(users);
    console.log(newUsers);
    return Promise.resolve(newUsers);
  } catch (error) {
    console.log(error);
    return Promise.reject(newUsers);
  }
};

populateConnectedUsers();
