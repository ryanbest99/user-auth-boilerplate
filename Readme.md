<p align="center">
  <a href="https://user-auth-1.herokuapp.com/#/">
    <img src="./user-auth.png"></a>
</p>

<p align="center">
  <img alt="GitHub License" src="https://img.shields.io/github/license/ryanbest99/user-auth-forquestion">
  
  <img alt="Website" src="https://img.shields.io/website?up_color=red&up_message=https%3A%2F%2Fuser-auth-1.herokuapp.com%2F%23%2F&url=https%3A%2F%2Fuser-auth-1.herokuapp.com%2F%23%2F">

  <img alt="repo-size" src="https://img.shields.io/github/repo-size/ryanbest99/user-auth-forquestion">
</p>

<br>

An **User Authentication boilerplate** that has register with email verification process, login with jwt authentication, sign out, forget password and reset password features with sendgrid email API.
<br />
It is a responsive web app aimed at helping people build user authentication features easily by taking the source code in the repository.

![User Auth Tech image](landing.png)

## Table of Contents

- [Features](#features)
- [Development](#development)
  - [Architecture](#architecture)
  - [Technologies](#technologies)
  - [Useage](#usage)
  - [Configuration](#configuration)
- [Development Environment](#development-environment)
- [Future Updates](#future-updates)
- [Author ](#author)
- [Design Advisor](#design-advisor)
- [Reference](#reference)

## Features

- Account Login and Register via email+password and jwt authentication
- Email verification for sign up users by using Sendgrid
- Send email that includes JWT for forgot password users
- Reset Password

---

## Development

### Architecture

![User Auth Tech Architecture](archi.png)

### Technologies

The primary libraries and dependencies used in the development of User Auth are shown below. For a complete list of dependencies, consult the package.json files inside `client` and `server` folders.

| Library                                                       | Purpose                                                 | Client or Server? |
| :------------------------------------------------------------ | :------------------------------------------------------ | :---------------- |
| [React.js](https://reactjs.org/)                              | A JavaScript library for building UIs                   | Client            |
| [Bootstrap](https://styled-components.com/)                   | Allows for CSS-in-JS for a nicer development experience | Client            |
| [Formik Yup](https://www.npmjs.com/package/formik)            | React.js Form Validation                                | Client            |
| [React-Tostify](https://www.npmjs.com/package/react-toastify) | Add notifications to your app with ease                 | Client            |
| [MongoDB with Mongoose](https://mongoosejs.com/)              | Schema-Based MongoDB Application Data Modeling          | Server            |
| [Express](https://expressjs.com/)                             | Backend Server Framework                                | Server            |
| [Sendgrid](https://www.npmjs.com/package/sendgrid-mail)       | Email service for register and forgot password          | Server            |
| [Bcryptjs](https://www.npmjs.com/package/bcryptjs)            | Hashing Password                                        | Server            |
| [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)    | For Token Based Authentication                          | Server            |

### Usage

| (1) Commands (`/client`) | Purpose                        |
| :----------------------- | :----------------------------- |
| `npm run start`          | Run Frontend Production Server |
| `npm run dev`            | Run Frontend Locally           |
| `npm run build`          | Build Frontend for Production  |

| (2) Commands (`/server`) | Purpose                           |
| :----------------------- | :-------------------------------- |
| `npm start`              | Run Backend Server                |
| `npm run dev`            | Run Backend locally using Nodemon |

### Configuration

| Location         | Purpose                                  |
| :--------------- | :--------------------------------------- |
| `/client`        | Frontend source directory                |
| `../components`  | App Components (React)                   |
| `../pages`       | Pages directory                          |
| `../public`      | Static Assets                            |
| `../utils`       | Frontend Datas                           |
| `/server`        | Backend source directory                 |
| `../db`          | MongoDB/Mongoose Connect                 |
| `../models`      | MongoDB/Mongoose Data Models and Schemas |
| `../controllers` | MongoDB/Mongoose Data Controllers        |
| `../routers`     | MongoDB/Mongoose Data Routers            |
| `../utils`       | Sendgrid Email                           |

---

## Development Environment

Before starting the server in your local dev. environment,the following environment variables should be defined:

| Variable Name          | Description                                                                                     |
| :--------------------- | :---------------------------------------------------------------------------------------------- |
| MONGO_URI              | MongoDB Atlas connection string (e.g. `mongodb+srv://MONGO_USER:MONGO_PASSWORD@cluster...`)     |
| CLIENT_URL             | URL for reset password and activate account                                                     |
| EMAIL_FROM             | Sendgrid Email sender                                                                           |
| JWT_ACCOUNT_ACTIVATION | JWT secret key for account activation                                                           |
| JWT_RESET_PASSWORD     | JWT secret key for reset password                                                               |
| JWT_EXPIRED            | JWT expiration                                                                                  |
| JWT_SECRET             | JWT Secret key                                                                                  |
| SENDGRID_API_KEY       | To use sendgrid email service, the key is necessary                                             |
| PORT                   | Server Port (8000 by default for local deploy). In production Heroku will provide its own port. |

This is accomplished by including the following in the .env file located in the root of the `/server` directory. This .env file must never be pushed to GitHub since it contains application sensitive information such as the database username and password.

The `/server/.env` file must contain the following:

```
MONGO_URI="mongodb+srv://..."
PORT=8000
CLIENT_URL="http://localhost:3000/#"
EMAIL_FROM="anonymous@email.com"
JWT_ACCOUNT_ACTIVATION="random character string"
JWT_RESET_PASSWORD="random character string"
JWT_EXPIRED="random time"
JWT_SECRET="random character string"
SENDGRID_API_KEY="valid sendgrid api key"
```

---

## Future Updates

O Auth :

- Implement Sign in with Google and Facebook.

State Management Update with Redux:

- Update React code to Redux for clean state management.

---

## Author

- Ryan Park[[Portfolio](https://portfolio-practice-01.herokuapp.com/)] [[LinkedIn](https://www.linkedin.com/in/ryanbest99/)]

---

## Design Advisor

- Jinseok Kim[[Portfolio](https://www.behance.net/hide-hiho)]

---

## Reference

#### To Resolve Deployment Issue

- Question on freecodecamp[[freecodecamp](https://forum.freecodecamp.org/t/post-deployment-test-opening-another-routes-in-a-new-tab-gets-error-question-video-included/481228)]

- React Routing works in local machine but not Heroku [[stackoverflow](https://stackoverflow.com/questions/41772411/react-routing-works-in-local-machine-but-not-heroku)]
