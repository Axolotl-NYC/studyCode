const db = require('../db_models/studyModels.js');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const unitControllers = {};

unitControllers.getUnits = (req, res, next) => {
  const queryString = 'SELECT * FROM units;';
  console.log('hitting here')
  db.query(queryString)
    .then((response) => {
      console.log('response is:', response);
      res.locals.units = response.rows;
      return next();
    });
};

/**
* createUser - create and save a new User into the database.
*/
// input username and password is stored in req.body
// createUser will check if username already exist in database
// if YES, account WILL NOT be created, res.locals.create = {userCreated: false}
// if no, account created using bcrypt to hash password, res.locals.create = {userCreated: true}
unitControllers.createUser = (req, res, next) => {

  const {username, password} = req.body;

  // query string to check if username exist in database
  const findUser = `SELECT * FROM "userlogin" WHERE username='${username}'`;

  db.query(findUser)
  .then(response => {
    // if there IS match username in database, go to next
    if (response.rows.length) {
      res.locals.create = {userCreated: false};
      return next();
    }
  });

    // proceed to create username with hash password, if no such user exist in database
  bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) =>{
      
      console.log("Password and hash: ", password, hash);
      const insertUser = `INSERT INTO "userlogin" (username, password) VALUES ('${username}', '${hash}')`;

      db.query(insertUser)
      .then(response => {
        res.locals.create = {userCreated: true};
        return next();
      })
});

};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/

// verifyUser will check if username exist in database
// if NO, password WILL NOT be check, res.locals.login = {usernameVerified: false}
// if YES, password check with bcrypt compare, 
  // correct password --> res.locals.login = {usernameVerified: true, passwordVerified: true}
  // incorrect password --> res.locals.login = {usernameVerified: true, passwordVerified: false}
unitControllers.verifyUser = (req, res, next) => {
  // write code here
    const {username, password} = req.body;
 
    const findUser = `SELECT * FROM "userlogin" WHERE username='${username}'`;

    db.query(findUser)
    .then(response => {
      // if no match username in database: do the following
      if (!response.rows.length) {
        res.locals.login = {usernameVerified: false};
        return next();
      }

      // else if username exist: do the following
      bcrypt.compare(password, response.rows[0].password, (err, result) => {

        // result will be true if it's a match, false otherwise;
          res.locals.login = {
            userNameVerified: true,
            passwordVerified: result
          };
          return next();
        
      });
      
    });

}
 




module.exports = unitControllers;
