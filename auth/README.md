# Authentication with JWT for login flow



## Libraries/tools used

- `MongoDB` - Database
- `express` - You know right!!
- `JWTtoken` - JWT tokens
- `hapi/joi` - for validation
- `cors` - express middleware to support Cross Origin Requests
- `dotenv` - environment variables manager

## Getting started

- Running the project locally, install the dependencies
```
$ npm install
```

- Start the server, you need to have `.env` file created in the root folder with
  `PORT` and `MONGO_URI` entries in it.
- `MONGO_URI` can be local installation or your cloud db url
```
$ npm start
```

- Thats it, you are good to go.