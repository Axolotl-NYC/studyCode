const db = require('../db_models/studyModels.js');

const unitControllers = {};

unitControllers.getUnits = (req, res, next) => {
  const queryString = 'SELECT * FROM units;';
  console.log('hitting here')
  db.query(queryString)
    .then((response) => {
      console.log('response is:', response.rows);
      res.locals.units = response.rows;
      return next();
    });
};

module.exports = unitControllers;
