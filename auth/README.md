# Authentication with JWT for login flow

## Libraries/tools used

- `MongoDB` - Database
- `express` - You know right!!
- `jsonwebtoken` - JWT tokens for authorization
- `hapi/joi` - for validation
- `cors` - express middleware to support Cross Origin Requests
- `dotenv` - environment variables manager
- `bcryptjs` - for password encryption and decryption
- `heroku` - for deployment - Check it out, it is easy and fun

## Getting started

- Running the project locally, install the dependencies
```
$ npm install
```

- You need to have `.env` file created in the root folder with
  `PORT`, `MONGO_URI`, and `JWT_ACCESS_TOKEN` entries in it.
- `MONGO_URI` can be local installation or your cloud db url.
- `JWT_ACCESS_TOKEN` used to pass it as secret token to `JWT.sign()` while creating one,
  token has an expiry time of `60 minutes`

- Start the dev-server
```
$ npm run dev-start
```

- Thats it, you are good to go

- When you are making the call to `secured-routes` for routes for eg:
  `/api/posts` route, copy the `JWT token` received after the successful login and
  set the header `auth-token` from `POSTMAN Client` or from
  any of your frameworks, when making `GET` or `POST` requests.
  `auth-token`: `Received Auth token`

## Available routes

- `POST` - `/api/user/register` - For registration - Required fields - `name`, `email`, `password`
- `POST` - `/api/user/login` - For Login and to receive the JWT token - Required fields -  `email`, `password`
- `GET` - `/api/posts` - secured route - header `auth-token` required.

## Deployed in heroku

- https://node-mongo-jwt-auth.herokuapp.com/ visit and access the above routes