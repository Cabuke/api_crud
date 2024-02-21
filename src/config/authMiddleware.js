// function checkToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ msg: "Acesso negado!" });
//   }

//   // Chama next() para prosseguir para o próximo middleware ou rota
//   next();
// }

// module.exports = { checkToken };
