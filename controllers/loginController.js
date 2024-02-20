const UserModel = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//   async search(req, res) {
//     try {
//       const searchList = await userModel.search();
//       return res.status(200).json(searchList);
//     } catch (error) {
//       return res.status(400).json(error.message);
//     }
//   }

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // validations
  if (!email) {
    return res.status(422).json({ msg: "O email deve ser obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha deve ser obrigatória!" });
  }

  // check if user exisits

  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // check if password match

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida!" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    });
  }
};
