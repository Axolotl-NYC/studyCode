/* eslint-disable no-console */

const db = require('../db_models/studyModels.js');

const resourceControllers = {};

resourceControllers.getResources = (req, res, next) => {
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

module.exports = resourceControllers;
