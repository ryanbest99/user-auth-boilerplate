require("dotenv").config({ path: "./config.env" });
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await User.create({ username, email, password });
    res.json({ success: true, newUser });
  } catch (err) {
    res.json({ success: false, err: err.message });
  }
};

exports.register2 = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ err: "Email is taken" });
  }

  try {
    const token = jwt.sign(
      { username, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10minutes" }
    );

    sendEmail({ email, token });

    res.status(202).json({
      message: `Email has been sent to ${email} successfully. Follow the instruction to activate your account`,
      token: token,
    });

    // res.json({ token });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

exports.accountActivation = (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      async function (err, decoded) {
        if (err) {
          return res.status(400).json({ err: "Expired Link. Signup Again" });
        }

        const { username, email, password } = jwt.decode(token);

        try {
          const newUser = await User.create({ username, email, password });

          res.status(200).json({
            success: true,
            newUser,
            token,
            message: "Congrats! You are signed-up. Please Sign-in",
          });
        } catch (err) {
          res.status(500).json({ success: false, err });
        }
      }
    );
  } else {
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.status(200).json({
      success: true,
      user,
      token,
      message: "You are signed-in. ",
    });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};

exports.users = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};
