const express = require("express");
const { check } = require("express-validator");
const { registerUser } = require("../controllers/registerController");

const router = express.Router();

router.post(
  "/register",
  [
    check("username", "Le nom d'utilisateur est requis").notEmpty(),
    check("email", "Veuillez fournir un email valide").isEmail(),
    check(
      "password",
      "Le mot de passe doit contenir au moins 6 caractères"
    ).isLength({ min: 6 }),
  ],
  registerUser
);

module.exports = router;
