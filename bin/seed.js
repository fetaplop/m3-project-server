const gtfs = require("gtfs");
const mongoose = require("mongoose");
require("dotenv").config({path: "../.env"}) // adding relative path to .env since there might be issues finding it otherwise

// now using actual gtfs data to seed the database.

// first we need a config file that needs to know where the data is and where it needs to go
const config = {

    //mongoUrl: 'mongodb://localhost:27017/gtfs', // documentation example
    mongoUrl: process.env.MONGODB_URI,
    agencies: [
        {
            agency_key: "Oulun Joukkoliikenne",
            path: "../gtfs",
            exclude: [
                'routes',
                'stop_times',
                'trips'
            ]
        }
    ]

}
// then we can connect to mongoose and import our data from the config file
mongoose.connect(config.mongoUrl, {useNewUrlParser: true});

// npm (package) gtfs does the trick!
gtfs.import(config)
    .then(() => {
        console.log('Import Successful');
        return mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
    });