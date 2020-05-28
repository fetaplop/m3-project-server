const express = require("express");
const gtfsStopRouter = express.Router();

const createError = require("http-errors");

// require helper function to check login
const {isLoggedIn} = require("../helpers/middlewares");

const GtfsStop = require("../models/GtfsStop");
const User = require("../models/User")

// IMPORTANT: probably should only get the STATIC data once. how do we handle this? Call this route only once when the whole app is run. 
// so this is taken care of now WITH REDUX  ^^

// GET    '/stops/'
gtfsStopRouter.get("/", (req, res, next) => {
    GtfsStop.find()
        .then((allStops) => {
            console.log('allStops: ', allStops)
            res
                .status(200) // is it actually this :D
                .json(allStops);
        })
        .catch((err) => next(createError(err)))
})

// GET    '/stops/:id'
gtfsStopRouter.get("/:id", (req, res, next) => {
    // stop id in collection
    const {id} = req.params;

    GtfsStop.findById(id)
        .then((stop) => {
            // some notes for when I actually make calls to the SIRI feed:
            // axios.get(urlString, optionsObjectsWithHeaders //or maybe no need to put headers myself).then(response => {response.data //parse whatever i get// })
            // for development, maybe save some responses from the server and use it as test data for client end
            console.log('stop by db id:', stop)
            res.status(200)
                .json(stop)
        })
        .catch((err) => next(createError(err)))

})

// POST   '/stops/:id/save'
gtfsStopRouter.post("/:id/save", isLoggedIn, (req, res, next) => { //isLoggedin!!!
    const {id} = req.params;
    const userID = req.session.currentUser._id

    //check if the stop IS already fave => if yes, dont' allow another save || if no, add it to favourites

    User.findById(userID)//_id: req.session.currentUser._id
        .then((userFound) => {
            console.log('userFound', userFound)
            console.log('userFound.favStops', userFound.favStops)
            console.log('this id is supposed to be the stop id, just checking if its still visible in user.findbyId', id)
            console.log('typeof id', typeof id)
            if (userFound.favStops.includes(id)) {
                // this is already in userfaves, do not add again!
                throw new Error("Stop is already in user favourites, will not add it again")
            }
            else { // add stop to userFavourites
                return (User.updateOne( // return a promise of updating this USer
                    {_id: userID},
                    {$push: {favStops: id}},
                    {new: true} // new: true => I want to return updated version of user

                ))

            }
        })
        .then((userUpdated) => { // we go to this block if we succeeded in updating the user
            console.log('userUpdated', userUpdated)
            res.status(201)
                .json(userUpdated)
        })
        .catch((err) => next(createError(err)))


})

// POST   '/stops/:id/UNsave'
gtfsStopRouter.post("/:id/unsave", isLoggedIn, (req, res, next) => {
    const {id} = req.params;

    // I promise to find user and update favStops 
    User.findByIdAndUpdate(
        {_id: req.session.currentUser._id},
        {$pull: {favStops: id}}, // for unlike use $pull 
        {new: true} //returns updtaed version of user
    )
        .then((userUpdated) => {
            console.log('userUpdated', userUpdated)
            res.status(200)
                .json(userUpdated) // this shows whatever!!
        })
        .catch((err) => next(createError(err)))

})

// PHILOSOPHY HOUR: 
// I decided to use POST for saving/unsaving fave bus stops since we add new information to that user.
// We edit the user profile by changing the user's favourite stops array. It could be done with PUT or in my mind, POST.

module.exports = gtfsStopRouter