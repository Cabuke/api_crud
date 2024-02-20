const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connection = mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@cluster0.egoqslg.mongodb.net/?retryWrites=true&w=majority`
);

module.exports = connection;
