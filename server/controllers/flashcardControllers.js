const db = require('../db_models/studyModels.js');

const flashcardControllers = {};

flashcardControllers.getFlashcards = (req, res, next) => {
  const { unitId } = req.params;
  const queryString = `SELECT * FROM flashcards WHERE unit_id = ${unitId};`;
  db.query(queryString)
    .then((response) => {
      // console.log('hitting GET FLASHCARDS and this is the response', response.rows);
      res.locals.flashcards = response.rows;
      return next();
    });
};

flashcardControllers.addedFlashcards = (req, res, next) => {
  console.log('this is req.body', req.body);
  console.log('this is req.params', req.params);
  const { unitId } = req.params;
  const { answer, question, created_by } = req.body;
  const dataArr = [unitId, answer, question, created_by];
  const queryString = 'INSERT INTO flashcards (unit_id, question, answer, created_by) VALUES ($1, $2, $3, $4);';
  db.query(queryString, dataArr)
    .then((response) => {
      // console.log('hitting ADD FLASHCARDS and this is the response', response);
      next();
    })
    .catch((error) => {
      console.log('this is an error', error);
    });
};

flashcardControllers.deleteFlashcards = (req, res, next) => {
  const { id } = req.body;
  const queryString = `DELETE FROM flashcards where id = ${id};`;
  db.query(queryString)
    .then((response) => {
      // console.log('hitting DELETE FLASHCARDS and this is response', response);
      return next();
    });
};


module.exports = flashcardControllers;
