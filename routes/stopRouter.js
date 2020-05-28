const express = require("express");
const stopRouter = express.Router();

const createError = require("http-errors");

// require helper function to check login
const {isLoggedIn} = require("../helpers/middlewares");

const Stop = require("../models/Stop");
const User = require("../models/User")

// IMPORTANT: probably should only get the STATIC data once. how do we handle this? Call this route only once when the whole app is run. 
// so this is taken care of now by using REDUX  ^^
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
                    {new: true} // new: true => return updated version of user HAD TO TAKE THIS OUT

                ))
                // try returning whole user and update it in next then block ?
                // return userFound
            }
        })
        // .then((userToUpdate) => {
        //     User.updateOne( // return a promise of updating this USer
        //         {_id: userToUpdate._id},
        //         {$push: {favStops: id}},
        //         {new: true}
        //     )}
        // )
        .then((userUpdated) => { // we go to this block if we succeeded in updating the user
            console.log('userUpdated', userUpdated)
            res.status(201)
                .json(userUpdated)
        })
        .catch((err) => next(createError(err)))


    // I promise to find user by id and update favStops 
    ////////////////////// OLD version with no checking if stop is already a favourite
    // User.findByIdAndUpdate(
    //     {_id: req.session.currentUser._id},
    //     {$push: {favStops: id}}, // for unlike just the same with $pull ??
    //     {new: true} //returns updtaed version of user
    // )
})

// POST   '/stops/:id/UNsave'
stopRouter.post("/:id/unsave", isLoggedIn, (req, res, next) => {
    const {id} = req.params;

    // I promise to find user and update favStops 
    User.findByIdAndUpdate(
        {_id: req.session.currentUser._id},
        {$pull: {favStops: id}}, // for unlike $pull 
        {new: true} //returns updtaed version of user
    )
        .then((userUpdated) => {
            console.log('userUpdated', userUpdated)
            res.status(200)
                .json(userUpdated) // can I make this json be something else?? not super clear what the json says..
        })
        .catch((err) => next(createError(err)))

})

// PHILOSOPHY HOUR: 
// I decided to use POST for saving/unsaving fave bus stops since practically I "post a like" by hitting a button in views.
// We edit the user profile by changing the user's favourite stops array. It could be done with PUT or in my mind, POST.

// -------------------------------------------------------------------------------------------------------
// Keeping one old PUT method in case we want to change back...

// // PUT    '/stops/:id/unsave'
// stopRouter.put("/:id/unsave", (req, res, next) => {
//     // stop id in collection
//     const {id} = req.params;

//     Stop.findById(id)
//         .then((stop) => {
//             const user = req.session.currentUser
//             console.log('user.favStops before we try to remove anything from there', user.favStops)
//             console.log(user.favStops.indexOf(stop._id))
//             res.json(stop)
//         })
//         .catch((err) => next(createError(err)))
// })

module.exports = stopRouter