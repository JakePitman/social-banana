require('dotenv').config();
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
    phone: '0425111222',
    password: process.env.MARGARET_PASSWORD
  },
  {
    email: 'mark@email.com',
    name: 'Mark',
    company: 'Banana Factory',
    phone: '0425111222',
    password: process.env.MARGARET_PASSWORD
  },
  {
    email: 'jake@email.com',
    name: 'Jake',
    company: 'Banana Factory',
    phone: '0425111222',
    password: process.env.MARGARET_PASSWORD
  },
  {
    email: 'serina@email.com',
    name: 'Serina',
    company: 'Banana Factory',
    phone: '0425111222',
    password: process.env.MARGARET_PASSWORD
  },
  {
    email: 'babs@email.com',
    name: 'Babs',
    company: 'Banana Factory',
    phone: '0425111222',
    password: process.env.MARGARET_PASSWORD
  },
  {
    email: 'franky@email.com',
    name: 'Franky',
    company: 'Banana Factory',
    phone: '0425111222',
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
