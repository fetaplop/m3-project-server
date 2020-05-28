const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    favStops: [{type: mongoose.Schema.Types.ObjectId, ref: "GtfsStop"}]
    //favStops: [{type: mongoose.Schema.Types.ObjectId, ref: "Stop"}] 
    // ^ early stage version with non-gtfs compatible data

})

const User = mongoose.model("User", userSchema);
module.exports = User;