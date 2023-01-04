const express = require("express");

const urlRouter = require("./urls/urls.router");
const userRouter = require("./users/users.router");

require("../associations/index");

const api = express.Router();

api.get("/", (req, res) => res.send("<h1>welcome!</h1>"));

// 1) urls
api.use("/urls", urlRouter);

// 2) users
api.use("/users", userRouter);

module.exports = api;
