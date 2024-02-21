const UserModel = require("../models/UsersModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  // validations

  if (!name) {
    return res.status(422).json({ msg: "O nome deve ser obrigatório!" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O email deve ser obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha deve ser obrigatória!" });
  }
  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "As senhas não conferem!" });
  }

  // check if user exists
  const userExists = await UserModel.findOne({ email: email });
  if (userExists) {
    return res.status(422).json({ msg: "E-mail ja existe!" });
  }

  // create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // create user
  const user = new UserModel({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    return res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    });
  }
};

exports.getUsers = async (req, res) => {
  console.log("ENTROU AQUI!!!!!222222");

  try {
    const usersList = await UserModel.find();
    return res.status(200).json(usersList);
  } catch (error) {
    console.error(`Err: ${error}`);
    return res.status(500).json({ msg: "Erro no servidor" });
  }
};
