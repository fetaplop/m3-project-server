const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stopSchema = new Schema({
    name: {type: String, required: true},
    stopId: {type: Number, required: true},
    stopCode: {type: Number, required: true},
    latitude: {type: Number, required: true}, // would be smart (?) to wrap these 2 together but they come as separate properties from the api
    longitude: {type: Number, required: true},
    busLines: [{type: Number}]
    //    busLines: [{type: mongoose.Schema.Types.ObjectId, ref: "Line"}] // might need to have this if the database grows
})

const Stop = mongoose.model("Stop", stopSchema);
module.exports = Stop;