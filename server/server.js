const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log(`******* FLOW TEST *******
  METHOD: ${req.method},
  URL: ${req.url},
  BODY: ${JSON.stringify(req.body, null, 2)}\n)`);
  // invoke next piece of middleware
  return next();
});

app.use(bodyParser())

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
