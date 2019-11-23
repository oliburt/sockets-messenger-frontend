# Sockets-Chat

Sockets chat is an instant messaging app. As a user you can view and message public Chatrooms or create your own. You can also directly message other users as a direct message which is private to the two people involved. This repo is only for the front end of the application. You can find the backend here: [Backend-Repo](https://github.com/oliburt/sockets-messenger-backend)

Here is a link to a live version: [Demo](https://s-chat-app-frontend.herokuapp.com/)

## Prerequisites

This was built on macOS.

In order to run this project on your own machine you will need first need Node.js and node-package-manager (npm) installed. (This was built with Node v.12.9.1 and npm v.6.13.1)

You can download node [here](https://nodejs.org/en/).
Npm should be installed with Node.

You can then clone this directory onto your machine, open the root directory in your terminal and run

```
npm install
```
to install all dependencies.

Then you can fire up the development server by running:
```
npm start
```
*The frontend has been configured to to send requests to the live backend. In order to change the endpoint to something else look in /src/adapaters/BackendAdapter.js and change the base urls to your choosing.*

## Main Features

Starting up the application a user who is not logged in can open and 'read-only' all public chatrooms. If a user 'signs-up' or 'logs-in', they gain the abilities to:
- add a public chatroom to 'My Chatrooms' which will save a quick link to the chatroom on the sidebar.
- Send messages in any public chatroom.
- Create their own public chatrooms.
- Find other users to send them a private direct message.

## Technology Stack

### Frontend

- JavaScript
- HTML
- CSS
- [Node.js]((https://nodejs.org/en/)) + NPM
- React (This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app))
- [Redux](https://redux.js.org/) + [Redux Devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) + [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [React Router Dom](https://reacttraining.com/react-router/web/guides/quick-start)
- [React Scroll to Bottom](https://github.com/compulim/react-scroll-to-bottom)
- Rails' [ActionCable](https://www.npmjs.com/package/actioncable) package
- Some styling done with [Semantic-UI-React](https://react.semantic-ui.com/)
- Deployed using [Heroku](https://www.heroku.com/platform)

### Backend - [Backend-Repo](https://github.com/oliburt/sockets-messenger-backend)

- [Ruby](https://www.ruby-lang.org/en/documentation/)
- [Rails](https://rubyonrails.org/) (Initialized with 'rails new' with '--api' flag)
- [Postgres](https://www.postgresql.org/)
- [Redis Gem](https://github.com/redis/redis-rb) for Action Cable in production
- Action Cable for WebSockets Protocol
- Active-Model-Serializers for data serialization
- Bcrypt for password authentication
- Rack-Cors for CORS
- JWT for user Auth (stored in an HTTP-Only Cookie)

## Future Development Plans

- Removing Chatrooms from 'My Chatrooms'
- Deleting a Chatroom (if you are the creator)
- Deleting direct messages
- Clicking on a user in a chatroom to get the option to DM them
- Creator of a chatroom able to have admin priveleges over a chatroom. E.g. Only allowing specific users to join, removing people etc.
- Deleting your account.
- Better validations/security for signing up. (At the moment, passwords only need to match and usernames must be unique)
- Editing account info (username and password)
- Notifications for unread messages
- Profile pictures
- Tests
- More to come...

## Author

Oliver Burt