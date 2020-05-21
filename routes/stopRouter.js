const express = require("express");
const stopRouter = express.Router();

const createError = require("http-errors");

const Stop = require("../models/Stop");

// IMPORTANT: probably should only get the STATIC data once per login. how do we handle this?
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

// SOS EN TIIÄ ONKO SE POSTMAN OK D:
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

// PUT    '/stops/:id/save'

// PUT    '/stops/:id/unsave'


module.exports = stopRouter