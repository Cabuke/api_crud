/* imports */

require("dotenv").config();
const express = require("express");
const app = express();
const publicRoute = require("../src/routers/publicRoute");
const usersRoute = require("../src/routers/usersRoute");
const loginRoute = require("../src/routers/loginRoute");
const authRoute = require("../src/routers/authRoute");
const clientRoute = require("../src/routers/clientRoute");

const port = 3000;
const connection = require("../src/config/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(publicRoute);
app.use(usersRoute);
app.use(loginRoute);
app.use(authRoute);
app.use(clientRoute);

connection
  .then(() => {
    app.listen(port, (error) => {
      if (error) {
        console.log("Não conectou ao banco!");
        return error.message;
      } else {
        console.log("Conectou ao banco!");
      }
    });
  })
  .catch((err) => console.log(err));

module.exports = app;
