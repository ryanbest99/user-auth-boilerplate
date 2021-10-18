const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please Fill out username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Fill out email"],
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: [true, "Please Fill out email"],
      trim: true,
      minlength: 6,
      // select: false,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain 'password' ");
        }
      },
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  next();
});

UserSchema.statics.findByCredentials = async function (email, password) {
  // const user = await User.findOne({ email }).select("+password");
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    throw new Error("Invalid Email");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  return user;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED,
  });

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
