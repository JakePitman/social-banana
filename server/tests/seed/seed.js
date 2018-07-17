const jwt = require('jsonwebtoken');

const { User } = require('./../../models/User');

const { ObjectId } = require('mongoose').Types;

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [
  {
    _id: userOneId,
    email: 'margaretbananadev@gmail.com',
    password: 'userOnePass',
    authTokens: [
      jwt.sign({ _id: userOneId }, process.env.JWT_SECRET).toString()
    ]
  },
  {
    _id: userTwoId,
    email: 'janetbananadev@outlook.com',
    password: 'userOnePass',
    authTokens: [
      jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET).toString()
    ]
  }
];

const populateUsers = async () => {
  await User.remove({});
  const newUsers = await User.create(users);
  return Promise.resolve(newUsers);
};

module.exports = { users, populateUsers };
