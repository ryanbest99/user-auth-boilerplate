require("dotenv").config({ path: "./config.env" });
const _ = require("lodash");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const { reduceRight } = require("lodash");

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

    const title = "Please verify your email";

    const text = `
      <h1>Please use the following link to activate your account</h1>
      <strong>${process.env.CLIENT_URL}/auth/activate/${token}</strong>
      <hr />
      <p>This Email may have sensitive information</p>
    `;

    sendEmail({ email, token, title, text });

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

exports.accountActivation2 = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);

    if (!decoded) {
      return res.status(400).json({ error: "Something went wrong! Try Again" });
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
  } catch (error) {
    return res.status(400).json({ error: error.message });
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

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ err: "Invalid Credentials!" });
  }

  try {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "1minute",
    });

    const title = "Please Reset Your Password";
    const text = `
      <h1>Please use the following link to reset your password</h1>
      <strong>${process.env.CLIENT_URL}/auth/resetpassword/${token}</strong>
      <hr />
      <p>This Email may have sensitive information</p>
    `;

    const updatedUser = await user.updateOne({ resetPasswordLink: token });

    if (!updatedUser) {
      console.log(`Reset Password Link Error`, error);
      return res.status(400).json({ success: false, error: error.message });
    }

    sendEmail({ email, title, text });

    res.status(202).json({
      message: `Email has been sent to ${email} successfully. Follow the instruction to reset your password`,
      token: token,
    });
  } catch (err) {
    res.status(404).send({ success: false, err: err.message });
  }
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      function (err, decoded) {
        if (err) {
          return (
            res
              .status(400)
              // .json({ err: err.message });
              .json({ err: "Expired Link. Please Try Again" })
          );
        }

        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({ err: "Something Went Wrong" });
          }

          const updateFields = { password: newPassword, resetPasswordLink: "" };
          user = _.extend(user, updateFields);
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: "Error resetting user password",
              });
            }
            res.json({
              message: `Great! Now you can login with your new password`,
            });
          });
        });
      }
    );
  }
};

exports.resetPassword2 = async (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  try {
    const decoded = jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD
    );

    if (!decoded) {
      return res.json({ error: "Something went wrong! Try Again" });
    }
    console.log(decoded);

    let user = await User.findOne({ resetPasswordLink });
    console.log(user.username);

    const updateFields = { password: newPassword, resetPasswordLink: "" };
    user = _.extend(user, updateFields);
    await user.save();

    console.log(user.password);

    try {
      res.json({ message: "Great! Now you can login with your new password" });
    } catch (error) {
      res.status(400).json({ error: "Error for resetting user password" });
    }
  } catch (error) {
    // return res.status(400).json({ error: "Expired Link! Try Again" });
    return res.status(400).json({ error: error.message });
  }
};

exports.resetPassword3 = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, myFunc);

    function myFunc(err, decoded) {
      if (err) {
        return res.status(400).json({ err: "Expired Link. Please Try Again" });
      }

      User.findOne({ resetPasswordLink }, (err, user) => {
        if (err || !user) {
          return res.status(400).json({ err: "Something Went Wrong" });
        }

        const updateFields = { password: newPassword, resetPasswordLink: "" };
        user = _.extend(user, updateFields);
        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: "Error resetting user password",
            });
          }
          res.json({
            message: `Great! Now you can login with your new password`,
          });
        });
      });
    }
  }
};
