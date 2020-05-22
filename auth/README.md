# Authentication with JWT for login flow

## Libraries/tools used

- `MongoDB` - Database
- `express` - You know right!!
- `jsonwebtoken` - JWT tokens for authorization
- `hapi/joi` - for validation
- `cors` - express middleware to support Cross Origin Requests
- `dotenv` - environment variables manager
- `bcryptjs` - for password encryption and decryption

## Getting started

- Running the project locally, install the dependencies
```
$ npm install
```

- Start the server, you need to have `.env` file created in the root folder with
  `PORT`, `MONGO_URI`, and `JWT_SECRET` entries in it.
- `MONGO_URI` can be local installation or your cloud db url.
- `JWT_SECRET` used to pass it as secret key to JWT web token

```
$ npm start
```

- Thats it, you are good to go.