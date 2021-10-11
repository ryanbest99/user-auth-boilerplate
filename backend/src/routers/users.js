const express = require("express");
const router = new express.Router();

const {
  register,
  register2,
  accountActivation,
  login,
  users,
} = require("../controllers/auth");

router.route("/users/register").post(register);
router.route("/users/register2").post(register2);
router.route("/users/register2").post(register2);
router.route("/users/account-activation").post(accountActivation);
router.route("/users/login").post(login);
router.route("/users/users").get(users);

module.exports = router;
