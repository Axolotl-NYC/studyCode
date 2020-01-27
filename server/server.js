const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const unitControllers = require('./controllers/unitControllers.js');
const flashcardControllers = require('./controllers/flashcardControllers.js');

const graphQLHTTP = require('express-graphql');
const schema = require('./graphql/graphql.js')

app.use(bodyParser());


app.use((req, res, next) => {
  console.log(`******* FLOW TEST *******
  METHOD: ${req.method},
  URL: ${req.url},
  BODY: ${JSON.stringify(req.body, null, 2)}\n)`);
  // invoke next piece of middleware
  return next();
});


// ****** below for signup / login *******
// when user sign up, go to createUser controller to create account
// createUser will check if username already exist in database
// if YES, account WILL NOT be created, res.locals.create = {userCreated: false}
// if no, account created using bcrypt to hash password, res.locals.create = {userCreated: true}

app.post('/signup', unitControllers.createUser, (req, res) => {
  console.log("inside signup post anonymous")
  // what should happen here on successful sign up?
  return res.status(200).json(res.locals.create);

});

// when user log in, go to verifyUser controller to verify account
// verifyUser will check if username exist in database
// if NO, password WILL NOT be check, res.locals.login = {usernameVerified: false}
// if YES, password check with bcrypt compare, 
// correct password --> res.locals.login = {userId: id, usernameVerified: true, passwordVerified: true}
// incorrect password --> res.locals.login = {userId: id, usernameVerified: true, passwordVerified: false}

app.post('/login', unitControllers.verifyUser, (req, res) => {
  console.log("inside login post anonymous")
  // what should happen here on successful log in?
  return res.status(200).json(res.locals.login);

});

// *********************************************

// handles incoming request to /units endpoint


app.get('/units', unitControllers.getUnits, (req, res) => {
  res.status(200).json(res.locals.units);
});

app.get('/units/:unitId', flashcardControllers.getFlashcards, (req, res) => {
  res.status(200).json(res.locals.flashcards);
});

app.post('/units/:unitId', flashcardControllers.addFlashcards, (req, res) => {
  res.status(200).json('flashcard successfully added!');
});

app.delete('/units/:unitId', flashcardControllers.deleteFlashcards, (req, res) => {
  res.status(200).json('flashcard successfully deleted!');
});

app.get('/resources/:unitId', unitControllers.getResources, (req, res) => {
  res.status(200).json(res.locals.resources);
});

app.use('/graphql', graphQLHTTP({
  schema,
  graphiql: true
}))

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
