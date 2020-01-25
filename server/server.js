const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const userController = require('./userController.js');

app.use(bodyParser())

app.use((req, res, next) => {
  console.log(`******* FLOW TEST *******
  METHOD: ${req.method},
  URL: ${req.url},
  BODY: ${JSON.stringify(req.body, null, 2)}\n)`);
  // invoke next piece of middleware
  return next();
});


// ****** Allen's edit below for login *******
// when user sign up, go to createUser controller to create account
// run bcrypt on the input password, and create user with the encrypted password
// go to cookieController set SSID cookie
// finds the correct user and set the cookie ssid with the database id
// start a session
// redirect to secret page that logs list of users and encrypted password
app.post('/signup', userController.createUser, /*cookieController.setSSIDCookie,
 sessionController.startSession,*/ (req, res) => {
   console.log("inside post anonymous")
  // what should happen here on successful sign up?
  return res.status(200).json("sign up success!!!");

  // redirect to secret
  // res.redirect('/secret');

  // send status code 202, also send body from local
  // return res.status(202).json(res.locals.user);
});

// *********************************************
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
