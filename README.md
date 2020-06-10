# m3-project-server


<br>

# Oulu Bus Stops

## Description

This is an app that provides all the bus stops within Oulu region. A user can search for bus stops by name and save stops as their favourites if they're logged in. 

Note: there have been some changes to bus stops in Linnanmaa area after seeding the app's database (last seeded in late May 2020) so the data is not 100% up-to-date. I will probably reseed after taking some steps to start using live stop monitoring data.

## Instructions

There is no easy way to run this app locally since you need to clone both the server and the client (which has its own repo, check the links at the bottom) and then you would need to seed the database. To see how the app works, check the link at the bottom of this readme to find a link to the deployed version instead! Please note that since the platform (Heroku) is free of charge, it might take a little while for the server to wake up and there is nothing I can do about it.

If you are still determined to run this on your machine, here are the steps. I cannot guarantee that these will work on a mac or linux system since I was using Win10 as my dev environment. The instructions are for installing and running the app in Visual Studio Code. Also, you will need MongoDB _running_ so that the database works. The data is from May 2020 but it's already partially deprecated. Anyway, here goes!

- Clone the server repository
- run `npm install` in your VS Code terminal (on repository folder root level!)
- navigate to the folder "bin"
- run `node seed.js` in your VS Code terminal (if you skip this, there will be no bus stops)
- navigate back to root level
- updating the instructions, trying to figure out how to fix .env issue.. nothing will run without the .env file!
<!-- add .env file and paste inside: REACT_APP_API_URL=http://localhost:5666 -->
- run `npm startdev` in your VS Code terminal
- this should be it for the backend, now check the steps for frontend!

## User Stories

-  **Home:** As an anon/user I can search for bus stops by name
-  **Signup:** As an anon I can can sign up as a user so that I will be able to save my favourite bus stops
-  **Login:** As a user I can log in
-  **Logout:** As a user I can log out
-  **Favourite bus stops** As a user I can save bus stops to my favourites and also unfavourite them
-  **View saved bus stops** As a user I can look at all my favourite stops

## Backlog

- Reseed DB after recent changes to Linnanmaa but stops!
- Tap into SIRI stop monitoring data:
	- Request bus stop information by stop ID using correct GTFS and SIRI formats
	- Receive data back 
	- Convert data to a format compatible with my database
- Filter relevant data: buses servicing this stop and their respective arrival times
- Display received data continuously on the bus stop page
- Dark theme (as default)
- Confirm if user really wants to delete their account to avoid accidents (FRONTEND)
- Error messages (in FRONTEND for bad login/signup requests )
- Add about page / instructions
- Bug fix for refreshing stop page


<br>


# Server / Backend

## Models

User model


```javascript
{
  username: {type: String, required: true},
  password: {type: String, required: true},
  favStops: [{type: mongoose.Schema.Types.ObjectId, ref: "Stop"}]
}
```

Stop model (early version in development)

```javascript
 {
    name: {type: String, required: true},
    stopId: {type: Number, required: true},
    stopCode: {type: String, required: true},
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true},
    busLines: [{type: Number}]
 }
```

GtfsStop model (this is used in the deployed version)

``` javascript 
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
```

<br>


## API Endpoints (backend routes)


| HTTP Method | URL                         | Request Body              | Success status | Error Status | Description                        |
| ----------- | --------------------------- | --------------------------| -------------- | ------------ | ---------------------------------- |
| GET         | `/auth/user `               | Saved session             | 200            | 404          | Check if user is logged in         |
| POST        | `/auth/signup`              | {username, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`               | {username, password}      | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`              | (empty)                   | 204            | 400          | Logs out the user                    |
| GET         | `/stops`                    |                           | 200            | 400          | Get all stops from DB                |
| GET         | `/stops/:id`                | {id}                      | 200            | 400          | Show specific bus stop               |
| POST        | `/stops/:id/favourite`      | {id}                      | 200            | 400          | Add stop to user favourites array    |
| POST        | `/stops/:id/unfavourite`    | {id}                      | 200            | 400          | Delete stop from user favourites     |
| GET         | `/user/favourites`          |                           | 200            | 400          | Show user's favourite bus stops      |
| DELETE      | `/user/delete`              |                           | 201            | 400          | Delete user                          |


<br>


## Links

Check [here my client repo in GitHub](https://github.com/fetaplop/m3-project-client) or find the [deployed version in Heroku!](https://oulu-bus-stops.herokuapp.com/)

