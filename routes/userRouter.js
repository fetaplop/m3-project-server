const express = require("express");
const userRouter = express.Router();

const createError = require("http-errors");

// import helper function to check login
const {isLoggedIn} = require("../helpers/middlewares");

const User = require("../models/User");

// GET     'user/favourites'
userRouter.get("/favourites", isLoggedIn, (req, res, next) => { // might have to use middleware here to check login!
    const user = req.session.currentUser;
    User.findById(user._id)
        .populate("favStops")
        .then((foundUser) => {
            const favStops = foundUser.favStops
            res.status(200)
                .json(favStops)

        })
        .catch((err) => next(createError(err)))
})

// DELETE     'user/delete'       make a check in frontend if you really want to delete user!
userRouter.delete("/delete", isLoggedIn, (req, res, next) => {
    const user = req.session.currentUser
    console.log('user to delete:', user)

    User.findByIdAndRemove(user._id)
        .then(deletedUser => {
            req.session.destroy()
            console.log('deletedUser after findByIdandRemove and req.session.', deletedUser)
            res.status(204) // json does not seem to work after this??
                .json({}) // added this and now postman behaves but obviously we don't see any json response
        })
        .catch((err) => next(createError(err)))
})

module.exports = userRouter