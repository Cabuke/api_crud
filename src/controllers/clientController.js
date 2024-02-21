const ClientModel = require("../models/ClientModel");

exports.create = async (req, res) => {
  console.log("ENTROU AQUI!!!!!");
  const { name, email, tags } = req.body;
  // validations

  if (!name) {
    return res.status(422).json({ msg: "O nome deve ser obrigatório!" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O email deve ser obrigatório!" });
  }

  // check if user exists
  const userExists = await ClientModel.findOne({ name: name, email: email });
  if (userExists) {
    return res.status(422).json({ msg: "Nome ou e-mail ja existem!" });
  }

  // create user
  const user = new ClientModel({
    name,
    email,
    tags,
  });

  try {
    await user.save();
    return res.status(201).json({ msg: "Cliente criado com sucesso!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    });
  }
};
exports.list = async (req, res) => {
  console.log("ENTROU AQUI!!!!!");

  try {
    const clientList = await ClientModel.find();
    return res.status(200).json(clientList);
  } catch (error) {
    console.error(`Err: ${error}`);
    return res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, email, tags } = req.body;

  try {
    const client = await ClientModel.findById(id);

    if (!client) {
      return res.status(404).json({ msg: "Cliente não encontrado!" });
    }

    if (name) client.name = name;
    if (email) client.email = email;
    if (tags) client.tags = tags;

    await client.save();

    return res.status(200).json({ msg: "Cliente atualizado com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erro interno do servidor" });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await ClientModel.findById(id);

    if (!client) {
      return res.status(404).json({ msg: "Cliente não encontrado!" });
    }

    await client.deleteOne();

    return res.status(200).json({ msg: "Cliente deletado com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erro interno do servidor" });
  }
};
