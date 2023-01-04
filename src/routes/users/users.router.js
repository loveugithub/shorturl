const express = require("express");
const passport = require("passport");

const { userSignup, userLogin } = require("./auth.controller");
const { getMe } = require("./users.controller");

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/signup", userSignup);

// protected
userRouter.use(passport.authenticate("jwt", { session: false }));
userRouter.get("/me", getMe);

module.exports = userRouter;
