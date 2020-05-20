# m3-project-server


<br>

# Bus arrival info table

<br>

## Description

This is an app that provides all the bus stops within Oulu region. A user can search for bus stops by name.

## User Stories

-  **Home:** As an anon/user I can search for bus stops by name
-  **Signup:** As an anon I can can sign up as a user so that I will be able to save my favourite bus stops
-  **Login:** As a user I can log in
-  **Logout:** As a user I can log out
-  **Favourite bus stops** As a user I can save bus stops to my favourites and also unfavourite them
-  **View saved bus stops** As a user I can look at all my favourite stops
-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist

## Backlog

- Tap into SIRI stop monitoring data:
	- Request bus stop information by stop ID using correct GTFS and SIRI formats
	- Receive data back 
	- Convert data to a format compatible with my database
- Filter relevant data: buses servicing this stop and their respective arrival times
- Display received data continuously on the bus stop page


<br>


# Client / Frontend

## React Router Routes (React App)
| Path                      | Component            | Permissions                | Behavior                                                      |
| ------------------------- | -------------------- | -------------------------- | ------------------------------------------------------------- |
| `/home`                   | HomePage             | public `<Route>`    ???    | Home page, where any user can search for bus stops            |
| `/home/:stopID`           | StopPage             | anon only `<AnonRoute>`    | Shows specific bus stop info                                  |
| `/signup`                 | SignupPage           | anon only  `<AnonRoute>`   | Signup form, link to login, navigate to login after signup    |
| `/login`                  | LoginPage            | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login  |
| `/private`                | MyPage               | user only `<PrivateRoute>` | Displays list of saved stops                                  |
| `/private/:stopID`        | StopPage             | user only `<PrivateRoute>` | Shows specific bus stop info with Favourite button            |
| `/private/:stopID`        | n/a                  | user only `<PrivateRoute>` | Add to favourites                                             |
| `/private/:stopID`        | n/a                  | user only `<PrivateRoute>` | Delete from favourites                                        |


## Components

- HomePage

- LoginPage

- SignupPage

- StopLink

- StopPage

- MyPage

- Navbar

 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me() ???

- Stop Service
  - stop.find()
  - stop.list()
  - stop.detail(id)

- User Service

???
get user's favourites
add stop to favourites
delete stop from favourites

user can search for stops both logged-in and anon ways!

- Tournament Service
  - tournament.list()
  - tournament.detail(id)
  - tournament.add(id)
  - tournament.delete(id)
  
- Player Service 

  - player.detail(id)
  - player.add(id)
  - player.delete(id)




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

Stop model

```javascript
 {
    name: {type: String, required: true},
    stopId: {type: Number, required: true},
    stopCode: {type: Number, required: true},
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true},
    busLines: [{type: Number}]
 }
```


<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body              | Success status | Error Status | Description                        |
| ----------- | --------------------------- | --------------------------| -------------- | ------------ | ---------------------------------- |
| GET         | `/auth/mypage `             | Saved session             | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`              | {name, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | `/tournaments`                |                              |                | 400          | Show all tournaments                                         |
| GET         | `/tournaments/:id`            | {id}                         |                |              | Show specific tournament                                     |
| POST        | `/tournaments/add-tournament` | {}                           | 201            | 400          | Create and save a new tournament                             |
| PUT         | `/tournaments/edit/:id`       | {name,img,players}           | 200            | 400          | edit tournament                                              |
| DELETE      | `/tournaments/delete/:id`     | {id}                         | 201            | 400          | delete tournament                                            |
| GET         | `/players`                    |                              |                | 400          | show players                                                 |
| GET         | `/players/:id`                | {id}                         |                |              | show specific player                                         |
| POST        | `/players/add-player`         | {name,img,tournamentId}      | 200            | 404          | add player                                                   |
| PUT         | `/players/edit/:id`           | {name,img}                   | 201            | 400          | edit player                                                  |
| DELETE      | `/players/delete/:id`         | {id}                         | 200            | 400          | delete player                                                |
| GET         | `/games`                      | {}                           | 201            | 400          | show games                                                   |
| GET         | `/games/:id`                  | {id,tournamentId}            |                |              | show specific game                                           |
| POST        | `/games/add-game`             | {player1,player2,winner,img} |                |              | add game                                                     |
| POST        | `/games/add-all-games`        |                              |                |              | add all games from a tournament. Gets a list of players and populates them via algorithm. |
| PUT         | `/games/edit/:id`             | {winner,score}               |                |              | edit game                                                    |


<br>


## Links

### Trello

[Link to trello board](https://trello.com/b/OGpErkbe/m3-project) 


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)


