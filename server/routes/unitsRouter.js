const express = require('express');

const unitsRouter = express.Router();

const flashcardControllers = require('../controllers/flashcardControllers');
const unitControllers = require('../controllers/unitControllers');


// handles incoming request to /units endpoint
unitsRouter.get('/',
  unitControllers.getUnits,
  (req, res) => {
    res.status(200).json(res.locals.units);
  });

unitsRouter.get('/:unitId',
  unitControllers.getResources,
  flashcardControllers.getFlashcards,
  (req, res) => {
    res.status(200).json({ flashCards: res.locals.flashcards, resources: res.locals.resources });
  });

unitsRouter.post('/:unitId',
  flashcardControllers.addFlashcards,
  (req, res) => {
    res.status(200).json('flashcard successfully added!');
  });

unitsRouter.delete('/:unitId',
  flashcardControllers.deleteFlashcards,
  (req, res) => {
    res.status(200).json('flashcard successfully deleted!');
  });

// unitsRouter.get('/resources/:unitId',
//   unitControllers.getResources, (req, res) => {
//     res.status(200).json(res.locals.resources);
//   });

module.exports = unitsRouter;
