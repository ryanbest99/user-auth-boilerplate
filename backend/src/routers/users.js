const express = require("express");
const router = new express.Router();

const {
  register,
  register2,
  accountActivation,
  login,
  users,
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/register2").post(register2);
router.route("/register2").post(register2);
router.route("/account-activation").post(accountActivation);
router.route("/login").post(login);
router.route("/users").get(users);

module.exports = router;
