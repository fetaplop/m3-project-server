const express = require("express");
const stopRouter = express.Router();

const createError = require("http-errors");

// require helper function to check login
const {isLoggedIn} = require("../helpers/middlewares");

const Stop = require("../models/Stop");
const User = require("../models/User")

// IMPORTANT: probably should only get the STATIC data once. how do we handle this? Call this route only once when the whole app is run. 
// GET    '/stops/'
stopRouter.get("/", (req, res, next) => {
    Stop.find()
        .then((allStops) => {
            console.log('allStops: ', allStops)
            res
                .status(200) // is it actually this :D
                .json(allStops);
        })
        .catch((err) => next(createError(err)))
})

// GET    '/stops/:id'
stopRouter.get("/:id", (req, res, next) => {
    // stop id in collection
    const {id} = req.params;

    Stop.findById(id)
        .then((stop) => {
            console.log('stop by db id:', stop)
            res.status(200)
                .json(stop)
        })
        .catch((err) => next(createError(err)))

})

// POST   '/stops/:id/save'
stopRouter.post("/:id/save", isLoggedIn, (req, res, next) => { //isLoggedin!!!
    const {id} = req.params;

    // I promise to find user by id and update favStops 
    User.findByIdAndUpdate(
        {_id: req.session.currentUser._id},
        {$push: {favStops: id}} // for unlike just the same with $pull ??
    )
        .then((userUpdated) => {
            console.log('userUpdated', userUpdated)
            res.status(201)
                .json(userUpdated)
        })
        .catch((err) => next(createError(err)))

})

// POST   '/stops/:id/UNsave'
stopRouter.post("/:id/unsave", isLoggedIn, (req, res, next) => {
    const {id} = req.params;

    // I promise to find user and update favStops 
    User.findByIdAndUpdate(
        {_id: req.session.currentUser._id},
        {$pull: {favStops: id}} // for unlike $pull 
    )
        .then((userUpdated) => {
            console.log('userUpdated', userUpdated)
            res.status(200)
                .json(userUpdated)
        })
        .catch((err) => next(createError(err)))

})

// PHILOSOPHY HOUR: 
// I decided to use POST for saving/unsaving fave bus stops since practically I "post a like" by hitting a button in views.
// We edit the user profile by changing the user's favourite stops array. It could be done with PUT or in my mind, POST.

// -------------------------------------------------------------------------------------------------------
// THESE DO NOT WORK except one of them, almost... leaving them for now
// PUT    '/stops/:id/save'
stopRouter.put("/:id/save", (req, res, next) => {
    // stop id in collection
    const {id} = req.params;

    // THIS WAY IT WORKS BUT UPDATES DO NOT SHOW UP IN COMPASS
    // Stop.findById(id)
    //     .then((stop) => {
    //         console.log('stop obj that we are trying to add to favourites: ', stop)

    //         // this requires a check if we are logged in or no????
    //         const user = req.session.currentUser;
    //         console.log('user before adding new fav stop:', user)


    //         // actually can I really do this???
    //         user.favStops.push(stop)
    //         console.log('user.favStops after pushing new stop to favourites: ', user.favStops)
    //         res.status(201) // should be  201 (Created)
    //             .json(stop) // could be removed maybe
    //     })
    //     .catch((err) => next(createError(err)))

    // --------------------------------- try again: ---------------------------------------

    Stop.findById(id)
        .then((stop) => {
            console.log('stop obj that we are trying to add to favourites: ', stop)

            // this requires a check if we are logged in or no????
            const userID = req.session.currentUser._id;
            //console.log('user before adding new fav stop:', user)

            return User.findByIdAndUpdate({userID}, {$push: {favStops: stop._id}})
        })
        .then(userUpdated => {
            console.log('userUpdated: ', userUpdated)
            res.status(201) // should be  201 (Created)
                .json(userUpdated) // could be removed maybe
        })
        .catch((err) => next(createError(err)))

    // --------------------------another way: (chained promises)-------------------------------
    // let promiseStop = Stop.findById(id)
    //     .then((stop) => {
    //         console.log('stop obj that we are trying to add to favourites: ', stop)
    //     })
    //     .catch((err) => next(createError(err)))

    // let promiseUser = User.findByIdAndUpdate({_id: req.session.currentUser._id}, {$push: {favStops: stop._id}})
    //     .then((userUpdated) => {
    //         console.log('userUpdated is the second promise: ', userUpdated)
    //     })
    //     .catch((err) => next(createError(err)))

    // Promise.all([promiseStop, promiseUser])
    //     .then(resultArr => {
    //         console.log('resultArray from promise all: ', resArr)
    //         res.status(201)
    //         .json(resultArr)
    //     })
    //     .catch((err) => next(createError(err)))


})

// PUT    '/stops/:id/unsave'
stopRouter.put("/:id/unsave", (req, res, next) => {
    // stop id in collection
    const {id} = req.params;

    Stop.findById(id)
        .then((stop) => {
            const user = req.session.currentUser
            console.log('user.favStops before we try to remove anything from there', user.favStops)
            console.log(user.favStops.indexOf(stop._id))
            res.json(stop)
        })
        .catch((err) => next(createError(err)))
})

module.exports = stopRouter