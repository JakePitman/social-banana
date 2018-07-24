const jwt = require('jsonwebtoken');

const { User } = require('./../../models/User');

const { ObjectId } = require('mongoose').Types;

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [
  {
    _id: userOneId,
    email: 'test1@email.com',
    password: 'teambanana7',
    name: 'Test User1',
    company: 'Test Company',
    phone: '0425111222',
    authTokens: [
      jwt.sign({ _id: userOneId }, process.env.JWT_SECRET).toString()
    ]
  },
  {
    _id: userTwoId,
    email: 'test2@email.com',
    password: 'teambanana7',
    name: 'Test User2',
    company: 'Test Company',
    phone: '0425111222',
    authTokens: [
      jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET).toString()
    ]
  }
];

const populateUsers = async () => {
  await User.remove({ company: 'Test Company' });
  const newUsers = await User.create(users);
  return Promise.resolve(newUsers);
};

module.exports = { users, populateUsers };
