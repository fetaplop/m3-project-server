const express = require("express");
const gtfsStopRouter = express.Router();

const createError = require("http-errors");

// require helper function to check login
const {isLoggedIn} = require("../helpers/middlewares");

const GtfsStop = require("../models/GtfsStop");
const User = require("../models/User")

// IMPORTANT: probably should only get the STATIC data once. how do we handle this? Call this route only once when the whole app is run. 
// so this is taken care of now when we only call this in ComponentDidMount when we land the home page ^^
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
                    {new: true} // new: true => return updated version of user HAD TO TAKE THIS OUT

                ))
                // try returning whole user and update it in next then block
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
    ////////////////////// old version with no chekcking if stop is already a favourite
    // User.findByIdAndUpdate(
    //     {_id: req.session.currentUser._id},
    //     {$push: {favStops: id}}, // for unlike just the same with $pull ??
    //     {new: true} //returns updtaed version of user
    // )
})

// POST   '/stops/:id/UNsave'
gtfsStopRouter.post("/:id/unsave", isLoggedIn, (req, res, next) => {
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
                .json(userUpdated) // this shows whatever!!
        })
        .catch((err) => next(createError(err)))

})

// PHILOSOPHY HOUR: 
// I decided to use POST for saving/unsaving fave bus stops since practically I "post a like" by hitting a button in views.
// We edit the user profile by changing the user's favourite stops array. It could be done with PUT or in my mind, POST.

// -------------------------------------------------------------------------------------------------------
// THESE DO NOT WORK except one of them, almost... leaving them for now
// PUT    '/stops/:id/save'
// gtfsStopRouter.put("/:id/save", (req, res, next) => {
//     // stop id in collection
//     const {id} = req.params;

//     // THIS WAY IT WORKS BUT UPDATES DO NOT SHOW UP IN COMPASS
//     // GtfsStop.findById(id)
//     //     .then((stop) => {
//     //         console.log('stop obj that we are trying to add to favourites: ', stop)

//     //         // this requires a check if we are logged in or no????
//     //         const user = req.session.currentUser;
//     //         console.log('user before adding new fav stop:', user)


//     //         // actually can I really do this???
//     //         user.favStops.push(stop)
//     //         console.log('user.favStops after pushing new stop to favourites: ', user.favStops)
//     //         res.status(201) // should be  201 (Created)
//     //             .json(stop) // could be removed maybe
//     //     })
//     //     .catch((err) => next(createError(err)))

//     // --------------------------------- try again: ---------------------------------------

//     GtfsStop.findById(id)
//         .then((stop) => {
//             console.log('stop obj that we are trying to add to favourites: ', stop)

//             // this requires a check if we are logged in or no????
//             const userID = req.session.currentUser._id;
//             //console.log('user before adding new fav stop:', user)

//             return User.findByIdAndUpdate({userID}, {$push: {favStops: GtfsStop._id}})
//         })
//         .then(userUpdated => {
//             console.log('userUpdated: ', userUpdated)
//             res.status(201) // should be  201 (Created)
//                 .json(userUpdated) // could be removed maybe
//         })
//         .catch((err) => next(createError(err)))

//     // --------------------------another way: (chained promises)-------------------------------
//     // let promiseStop = GtfsStop.findById(id)
//     //     .then((stop) => {
//     //         console.log('stop obj that we are trying to add to favourites: ', stop)
//     //     })
//     //     .catch((err) => next(createError(err)))

//     // let promiseUser = User.findByIdAndUpdate({_id: req.session.currentUser._id}, {$push: {favStops: GtfsStop._id}})
//     //     .then((userUpdated) => {
//     //         console.log('userUpdated is the second promise: ', userUpdated)
//     //     })
//     //     .catch((err) => next(createError(err)))

//     // Promise.all([promiseStop, promiseUser])
//     //     .then(resultArr => {
//     //         console.log('resultArray from promise all: ', resArr)
//     //         res.status(201)
//     //         .json(resultArr)
//     //     })
//     //     .catch((err) => next(createError(err)))


// })

// // PUT    '/stops/:id/unsave'
// gtfsStopRouter.put("/:id/unsave", (req, res, next) => {
//     // stop id in collection
//     const {id} = req.params;

//     GtfsStop.findById(id)
//         .then((stop) => {
//             const user = req.session.currentUser
//             console.log('user.favStops before we try to remove anything from there', user.favStops)
//             console.log(user.favStops.indexOf(GtfsStop._id))
//             res.json(stop)
//         })
//         .catch((err) => next(createError(err)))
// })

module.exports = gtfsStopRouter