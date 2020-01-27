const db = require('../db_models/studyModels.js');

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const unitControllers = {};

unitControllers.getUnits = (req, res, next) => {
  const queryString = 'SELECT * FROM units;';
  db.query(queryString)
    .then((response) => {
      // console.log('response is:', response.rows);
      res.locals.units = response.rows;
      return next();
    });
};

unitControllers.getResources = (req, res, next) => {
  console.log('hitting get Resources')
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

/**
* createUser - create and save a new User into the database.
*/
// input username and password is stored in req.body
<<<<<<< HEAD
// createUser will check if username already exist in database
// if YES, account WILL NOT be created, res.locals.create = {userCreated: false}
// if no, account created using bcrypt to hash password, res.locals.create = {userCreated: true}
unitControllers.createUser = (req, res, next) => {

  const {username, password} = req.body;
=======
// use bcrypt to hash the input password with salt factor and callback
// inside callback, create the user with the hash passowrd
// if success, go to next
unitControllers.createUser = (req, res, next) => {
  // destructure username and password from req.body
  const { username, password } = req.body;
>>>>>>> dev

  // query string to check if username exist in database
  const findUser = `SELECT * FROM "userlogin" WHERE username='${username}'`;

<<<<<<< HEAD
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

=======
  // console.log("db is: ", db);
  // console.log("req body inside creatUser: ", req.body)
  bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
    console.log('Password and hash: ', password, hash);
    const insertUser = `INSERT INTO "userlogin" (username, password) VALUES ('${username}', '${hash}')`;

    db.query(insertUser)
      .then((response) =>
      //   console.log("response: ", response)
        next());
  });
>>>>>>> dev
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/

<<<<<<< HEAD
// verifyUser will check if username exist in database
// if NO, password WILL NOT be check, res.locals.login = {usernameVerified: false}
// if YES, password check with bcrypt compare, 
  // correct password --> res.locals.login = {userId: id, usernameVerified: true, passwordVerified: true}
  // incorrect password --> res.locals.login = {userId: id, usernameVerified: true, passwordVerified: false}
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
            userId: response.rows[0].id,
            userNameVerified: true,
            passwordVerified: result
          };
          return next();
        
      });
      
    });

}
 



=======
// find the user in the database, if none, go to global error handler
// use bcrypt to compare the input password and the password stored
// if error, redirect to signup page
// move onto next
// unitControllers.verifyUser = (req, res, next) => {
// write code here

// console.log(req.body);
// find user in table where names are equal
// console.log("User: ", User);
// User.find({ username: req.body.username}, (err, people) => {
//   // console.log("inside callback: ")
//   // console.log(people[0].username, people[0].password);
//   if (!people) {
//     next(err);
//   }
//   console.log("DB password: ", people[0].password);
//   bcrypt.compare(req.body.password, people[0].password, (err, result) => {

//       if(err){
//         console.log("error: ", err);
//         res.redirect('/signup');
//       }
//     next();
//   });
//   // if (people[0].password === req.body.password) {
//   //   // console.log(people[0].id);
//   //   next()
//   // } else {
//   //   res.redirect('/signup');
//   // };
// } )

// if success, compare password to make sure they are equal

// };
>>>>>>> dev

module.exports = unitControllers;
