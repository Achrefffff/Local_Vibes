const { validationResult } = require("express-validator");
const { createUser } = require("../models/register");

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const userId = await createUser(username, email, password);
    res.status(201).json({ message: "Utilisateur créé avec succès", userId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res
        .status(400)
        .json({ message: "Nom d'utilisateur ou email déjà utilisé" });
    } else {
      res
        .status(500)
        .json({ message: "Erreur du serveur", error: err.message });
    }
  }
};

module.exports = { registerUser };
