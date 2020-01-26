const db = require('../db_models/studyModels.js');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const unitControllers = {};

unitControllers.getUnits = (req, res, next) => {
  const queryString = 'SELECT * FROM units;';
  db.query(queryString)
    .then((response) => {
      console.log('response is:', response.rows);
      res.locals.units = response.rows;
      return next();
    });
};

/**
* createUser - create and save a new User into the database.
*/
// input username and password is stored in req.body
// use bcrypt to hash the input password with salt factor and callback
  // inside callback, create the user with the hash passowrd
// if success, go to next
unitControllers.createUser = (req, res, next) => {

  //destructure username and password from req.body
  const {username, password} = req.body;

  // TODO: NEED TO CHECK IF USERNAME ALREADY EXIST
  // TODO: IF YES, DO NOT HASH/QUERY, RETURN ERROR;

  // console.log("db is: ", db);
  // console.log("req body inside creatUser: ", req.body)
  bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) =>{
      
      console.log("Password and hash: ", password, hash);
      const insertUser = `INSERT INTO "userlogin" (username, password) VALUES ('${username}', '${hash}')`;

      db.query(insertUser)
      .then(response => {
      //   console.log("response: ", response)
        return next();
      })
});

};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/

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

module.exports = unitControllers;
