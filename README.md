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
- Dark theme (as default)
- Confirm if user really wants to delete their account to avoid accidents

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
    stopCode: {type: String, required: true},
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true},
    busLines: [{type: Number}]
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
| PUT         | `/stops/:id/favourite`      | {id}                      | 200            | 400          | Add stop to user favourites array    |
| PUT         | `/stops/:id/unfavourite`    | {id}                      | 200            | 400          | Delete stop from user favourites     |
| GET         | `/user/favourites`          |                           | 200            | 400          | Show user's favourite bus stops      |
| DELETE      | `/user/delete`              |                           | 201            | 400          | Delete user                          |


<br>

# Client / Frontend

## React Router Routes (React App)
| Path                      | Component            | Permissions                | Behavior                                                      |
| ------------------------- | -------------------- | -------------------------- | ------------------------------------------------------------- |
| `/home`                   | HomePage             | public `<Route>`           | Home page, where any user can search for bus stops            |
| `/home/:stopID`           | StopPage             | public `<Route>`           | Shows specific bus stop info with fave-btn for user only      |
| `/signup`                 | SignupPage           | anon only `<AnonRoute>`    | Signup form, link to login, navigate to login after signup    |
| `/login`                  | LoginPage            | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login  |
| `/favourites`             | MyPage               | user only `<PrivateRoute>` | Displays list of saved stops                                  |



## Components

- LoginPage

- SignupPage

- HomePage

- Search

- (Results??)

- StopLink

- StopPage

- MyFavourites

- Navbar

 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- Stop Service
  - stop.getAll()
  - stop.getOne(id)
  - stop.save(id)
  - stop.unsave(id)

- User Service

  - user.favourites()
  - user.delete()

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


