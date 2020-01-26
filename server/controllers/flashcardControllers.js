const db = require('../db_models/studyModels.js');

const flashcardControllers = {};

flashcardControllers.getFlashcards = (req, res, next) => {
  console.log('hitting this')
  const { id } = req.params;
  const queryString = `SELECT * FROM flashcards WHERE unit_id = ${id};`;
  db.query(queryString)
    .then((response) => {
      console.log(response);
      res.locals.flashcards = response.rows;
      next();
    });
};


module.exports = flashcardControllers;
