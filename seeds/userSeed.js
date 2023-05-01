const { User } = require('../models')

// Saves and stores user information to check authentication

const userData = [
  {
    name: 'Lebron',
    password: 'James'
  },
  {
    name: 'Ozzy',
    password: 'Osbourne'
  }
]

const seedUserData = () => User.bulkCreate(userData);

module.exports = seedUserData;