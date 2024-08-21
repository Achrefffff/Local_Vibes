const express = require("express");
const { check } = require("express-validator");
const { loginUser } = require("../controllers/loginController");

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Veuillez fournir un email valide").isEmail(),
    check("password", "Le mot de passe est requis").notEmpty(),
  ],
  loginUser
);

module.exports = router;
