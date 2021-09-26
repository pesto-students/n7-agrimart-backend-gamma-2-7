const mongoose = require('mongoose');

const fs = require('fs');
const config = require('./src/config/config');
const logger = require('./src/config/logger');

// Load Models

const { Category } = require('./src/models');
// connect to db
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
});

// Read The JSON files
let Categories = JSON.parse(fs.readFileSync(`${__dirname}/_seedData/Categories.json`, 'utf-8'));

// Import Sample Data In DB
const importData = async () => {
  try {
    Categories = Categories.map((category) => {
      const categoryObj = { ...category, icon: `${process.env.URL}${category.icon}` };
      return categoryObj;
    });

    await Category.create(Categories);
    logger.info(`Data successfully imported`);
    process.exit();
  } catch (err) {
    logger.info(err);
  }
};

// Delete the data from DB
const deleteData = async () => {
  try {
    await Category.deleteMany();
    logger.info(`Data successfully deleted`);
    process.exit();
  } catch (err) {
    logger.info(err);
  }
};

if (process.argv[2] === '-i') {
  importData().then();
} else if (process.argv[2] === '-d') {
  deleteData().then();
}
