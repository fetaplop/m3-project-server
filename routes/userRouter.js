const express = require("express");
const userRouter = express.Router();

const createError = require("http-errors");

const Stop = require("../models/Stop");
const User = require("../models/User");

// GET     'user/favourites'
userRouter.get("/favourites", (req, res, next) => { // might have to use middleware here to check login!
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

// DELETE 

module.exports = userRouter