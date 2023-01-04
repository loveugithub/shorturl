const crypto = require("crypto");

const jwt = require("jsonwebtoken");

const {
  createUser,
  findUserWithPassword,
} = require("../../models/users/users.model");

const { sequelize } = require("../../services/postgres");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id, user.model);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  // don't send password & passwordConfirm
  user.password = undefined;
  user.passwordConfirm = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const userSignup = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const bodyData = req.body;
    const user = await createUser(bodyData, t);

    await t.commit();
    createSendToken(user, 201, res);
  } catch (err) {
    await t.rollback();
    console.log("getting error...");
    console.error(err);
    res.status(400).json({
      error: err,
    });
  }
};

const userLogin = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "Please provide email and password!",
      });
    }

    const user = await findUserWithPassword(email, t);
    if (!user || !(await user.checkPassword(password, user.password))) {
      return res.status(404).json({
        msg: "Incorrect email or password!",
      });
    }

    await t.commit();
    createSendToken(user, 200, res);
  } catch (err) {
    await t.rollback();
    console.log("getting error...");
    console.error(err);
    res.status(400).json({
      error: err,
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
};
