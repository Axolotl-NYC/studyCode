const db = require('../db_models/studyModels.js');

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const unitControllers = {};

unitControllers.getUnits = (req, res, next) => {
  const queryString = 'SELECT * FROM units;';
  db.query(queryString)
    .then((response) => {
      // console.log('response is:', response.rows);
      res.locals.units = response.rows;
      return next();
    });
};

unitControllers.getResources = (req, res, next) => {
  console.log('hitting get Resources');
  console.log(req.params, 'hoi');
  const { unitId } = req.params;
  const queryString = `SELECT * FROM resources WHERE unit_id = ${unitId};`;
  db.query(queryString)
    .then((response) => {
      // console.log('getResources response is', response);
      res.locals.resources = response.rows;
      return next();
    });
};

module.exports = unitControllers;
