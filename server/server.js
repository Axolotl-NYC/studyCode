const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const unitControllers = require('./controllers/unitControllers.js');

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
// run bcrypt on the input password, and create user with the encrypted password
// TODO: go to cookieController set SSID cookie
// TODO: finds the correct user and set the cookie ssid with the database id
// TODO: start a session
app.post('/signup', unitControllers.createUser, /*cookieController.setSSIDCookie,
 sessionController.startSession,*/ (req, res) => {
   console.log("inside signup post anonymous")
  // what should happen here on successful sign up?
  return res.status(200).json("sign up success!!!");

});

// app.post('/login', unitControllers.verifyUser, /*cookieController.setSSIDCookie,
//  sessionController.startSession,*/ (req, res) => {
//    console.log("inside login post anonymous")
//   // what should happen here on successful sign up?
//   return res.status(200).json("log in success!!!");

// });

// *********************************************

app.get('/units', unitControllers.getUnits, (req, res) => {
  res.status(200).json(res.locals.units);
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
