const express = require("express");
const authRouter = express.Router();

const createError = require("http-errors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/user");


// HELPER FUNCTIONS
const { isLoggedIn, isNotLoggedIn, validationLogin } = require("../helpers/middlewares");

// POST   '/auth/signup'
authRouter.post('/signup', isNotLoggedIn, validationLogin, (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      //  - check if the `username` exists, if it does send a response with an error
      if (user) {
        return next(createError(400));
      }
      else {  //  - if `username` is unique then:
        //     - encrypt the password using bcrypt
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        //     - create the new user in DB using the `username` and the encrypted password
        User.create({ username, password: hashPass })
          .then((newUser) => {
            //     - save the newly created user in the `session`
            newUser.password = "****";
            req.session.currentUser = newUser;
            //     - send back the response 201 (created) and the new user object
            res
              .status(201) // Created
              .json(newUser);

          })
          .catch((err) => next(createError(err)));
      }
    }).catch((err) => next(createError(err)));
})

// POST    '/auth/login'
authRouter.post('/login', isNotLoggedIn, validationLogin, (req, res, next) => {

  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      //  - check if user exists in the DB
      if (!user) {
        //  - if user doesn't exist - forward the error to the error middleware using `next()`
        return next(createError(404)); // Unathorized
      }
      else {
        //  - check if the password is correct
        const passwordCorrect = bcrypt.compareSync(password, user.password);
        if (passwordCorrect) {
          //  - if password is correct assign the user document to `req.session.currentUser`
          user.password = "****";
          req.session.currentUser = user;
          //  - send  json response
          res
            .status(200)
            .json(user);
        }
      }
    })
    .catch((err) => next(createError(err)));
})

// GET   '/auth/logout'
authRouter.get('/logout', isLoggedIn, (req, res, next) => {
  //  - check if the user is logged in using helper function (check if session exists)

  //  - destroy the session
  req.session.destroy(function (err) {
    if (err) next(createError(err));
    else {
      //  - set status code and send the response back
      res
        .status(204) // No Content
        .send();
    }
  })
})

// GET    '/auth/me'
authRouter.get('/me', isLoggedIn, (req, res, next) => {
  //  - check if the user IS logged in using helper function (check if session exists)

  //  - if yes, send the response with user info (available on req.session.currentUser)
  const currentUserSessionData = req.session.currentUser;
  res
    .status(200)
    .json(currentUserSessionData);
})


module.exports = authRouter;
