// const clientModel = require("../models/ClientModel");
const UserModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");

exports.search = async (req, res) => {
  const id = req.params.id;

  // check if user exists
  const user = await UserModel.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }
  res.status(200).json({ user });
};
exports.checkToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(400).json({ msg: "Token inválido" });
  }
};
