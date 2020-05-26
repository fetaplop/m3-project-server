const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stopSchema = new Schema(
    {

    stop_id: {type: String},
    stop_code: {type: String},
    stop_name: {type: String},
    stop_desc: {type: String},
    stop_lat: {type: Number},
    stop_lon: {type: Number},
    zone_id: {type: String},
    stop_url: {type: String},
    location_type: {Number},
    parent_station: {type: String},
    stop_timezone: {type: String},
    agency_key: {type: String},
    created_at: {type: Date},
    loc: [{type: Number}]
    }
)

const GtfsStop = mongoose.model("GtfsStop", stopSchema, "stops");
module.exports = GtfsStop;

// looks like this in mongoose:

// stop_id:"120740"
// stop_code:"2045"
// stop_name:"Koivumaantien ostoskeskus E"
// stop_desc:""
// stop_lat:65.019674
// stop_lon:25.551849
// zone_id:"2"
// stop_url:"http://oulunliikenne.fi/2045"
// location_type:0
// parent_station:""
// stop_timezone:"Europe/Helsinki"
// agency_key:"Oulun Joukkoliikenne"
// created_at:2020-05-26T19:24:47.167+00:00
// loc:0:25.551849 // asfafdg well it's an array
// 1:65.019674
