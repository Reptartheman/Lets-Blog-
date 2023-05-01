const sequelize = require('../config/connection');
const seedUserData = require('./userSeed');
const seedPostData = require('./postSeed');
const seedCommentData = require('./commentSeed');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n-----DATABASE SYNCED-----\n');

    await seedUserData();
    console.log('\n-----SAMPLE USERS SEEDED-----\n');

    await seedPostData();
    console.log('\n-----SAMPLE POST SEEDED-----\n');

    await seedCommentData();
    console.log('\n-----SAMPLE COMMENTS SEEDED-----\n');

    process.exit(0);

};

seedDatabase();