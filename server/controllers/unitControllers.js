const db = require('../db_models/studyModels.js');

const unitControllers = {};

unitControllers.getUnits = (req, res, next) => {
  const queryString = 'SELECT * FROM units;';

  db.query(queryString)
    .then((response) => {
      console.log('response is:', response);
      return next();
    });
};

module.exports = unitControllers;
