const moongose = require("mongoose");
const ClientModel = moongose.model("Client", {
  name: String,
  email: String,
  tags: String,
});

module.exports = ClientModel;
