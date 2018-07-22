const jwt = require('jsonwebtoken');

const { User } = require('./../../models/User');

const { ObjectId } = require('mongoose').Types;

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [
  {
    _id: userOneId,
    email: 'jimbo@email.com',
    password: 'teambanana7',
    name: 'Jimbo',
    company: 'Box Factory',
    phone: '04253213245',
    authTokens: [
      jwt.sign({ _id: userOneId }, process.env.JWT_SECRET).toString()
    ]
  },
  {
    _id: userTwoId,
    email: 'beatrice@email.com',
    password: 'teambanana7',
    name: 'Beatrice',
    company: 'Box Factory',
    phone: '04976829030',
    authTokens: [
      jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET).toString()
    ]
  }
];

const populateUsers = async () => {
  await User.remove({ company: 'Box Factory' });
  const newUsers = await User.create(users);
  return Promise.resolve(newUsers);
};

module.exports = { users, populateUsers };
