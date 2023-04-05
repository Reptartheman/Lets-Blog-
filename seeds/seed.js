const sequelize = require('../config/connection');
const seedUserData = require('./userSeed');
const seedPostData = require('./postSeed');
const seedCommentData = require('./commentSeed');


const seedDatabase = async () => {
    await sequelize.sync({ force: true});
    await seedUserData();
    await seedPostData();
    await seedCommentData();
};

seedDatabase();