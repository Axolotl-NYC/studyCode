const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const unitControllers = require('./controllers/unitControllers.js');
const flashcardControllers = require('./controllers/flashcardControllers.js');

app.use((req, res, next) => {
  console.log(`******* FLOW TEST *******
  METHOD: ${req.method},
  URL: ${req.url},
  BODY: ${JSON.stringify(req.body, null, 2)}\n)`);
  // invoke next piece of middleware
  return next();
});

app.use(bodyParser());

// handles incoming request to /units endpoint

app.get('/units', unitControllers.getUnits, (req, res) => {
  res.status(200).json(res.locals.units);
});

app.get('/units/:unitId', flashcardControllers.getFlashcards, (req, res) => {
  res.status(200).json(res.locals.flashcards);
});

app.post('/units/:unitId', flashcardControllers.addedFlashcards, (req, res) => {
  res.status(200).json('flashcard successfully added!');
});

app.delete('/units/:unitId', flashcardControllers.deleteFlashcards, (req, res) => {
  res.status(200).json('flashcard successfully deleted!');
});


// sends a GET request to retreive the bundle.js
app.use('/build', (req, res) => res.sendFile((path.resolve(__dirname, '../build/bundle.js'))));

app.use('/', (req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));


// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => res.sendStatus(404));
// asterisk '*' means 'wildcard' and matches any route to catch everything

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
