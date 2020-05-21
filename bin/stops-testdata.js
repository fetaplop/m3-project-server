//stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station,stop_timezone
//120558,1786,Ylioppilaskylä E,,65.05758400000002,25.472236,2,http://oulunliikenne.fi/1786,0,,Europe/Helsinki
// following GTFS format
const testStops = [
    {
        name: "Ylioppilaskylä E",
        stopId: 120558,
        stopCode: 1786,
        latitude: 65.05758400000002, // would be smart (?) to wrap these 2 together but they come as separate properties from the api
        longitude: 25.472236,
        busLines: [1, 2, 3, 8]
    },
    {
        name: "Ylioppilaskylä P",
        stopId: 120557,
        stopCode: 1785,
        latitude: 65.05759500000002, // would be smart (?) to wrap these 2 together but they come as separate properties from the api
        longitude: 25.472469,
        busLines: [1, 2, 3, 8]
    },
    {
        name: "Puulinnanmaa P",
        stopId: 300419,
        stopCode: 1796,
        latitude: 65.055656, // would be smart (?) to wrap these 2 together but they come as separate properties from the api
        longitude: 25.462143,
        busLines: [2, 3]
    },
    {
        name: "Yliopisto P",
        stopId: 120544,
        stopCode: 1770,
        latitude: 65.058942, // would be smart (?) to wrap these 2 together but they come as separate properties from the api
        longitude: 25.469927,
        busLines: [1, 2, 3, 4, 5, 8]
    },
    {
        name: "Kasvi E",
        stopId: 148009,
        stopCode: 3037,
        latitude: 64.793245, // would be smart (?) to wrap these 2 together but they come as separate properties from the api
        longitude: 25.624873,
        busLines: [7, 8, 22]
    }
]

module.exports = testStops
// {
//     name: ,
//     stopId: ,
//     stopCode: ,
//     latitude: , // would be smart (?) to wrap these 2 together but they come as separate properties from the api
//     longitude: ,
//     busLines: []
// },